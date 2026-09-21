import { useState, useEffect, useMemo } from "react";

export function useProductos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Nuevo estado para guardar los objetos completos de la base de datos { id, nombre }
  const [categoriasBase, setCategoriasBase] = useState([]);

  // Estados de filtros
  const [categoriaActiva, setCategoriaActiva] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");
  const [busquedaDebounced, setBusquedaDebounced] = useState(""); // <-- NUEVO ESTADO
  const [orden, setOrden] = useState("relevancia");

  // Estados de paginación
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const limite = 12;

  useEffect(() => {
    const timer = setTimeout(() => {
      setBusquedaDebounced(busqueda);
    }, 500); 

    // Si el usuario teclea otra letra antes de los 500ms, borramos el timer anterior
    return () => clearTimeout(timer); 
  }, [busqueda]);

  // 1. Efecto de inicialización: Traemos las categorías reales
  useEffect(() => {
    fetch("https://localhost:7045/api/categorias")
      .then((res) => res.json())
      .then((data) => setCategoriasBase(data))
      .catch((err) => console.error("Error al cargar categorías:", err));
  }, []);

  // 2. Armamos el array simple de textos para tu UI
  const categorias = useMemo(() => {
    return ["Todos", ...categoriasBase.map((c) => c.descripcion || c.Descripcion)];
  }, [categoriasBase]);

  // 3. Reiniciamos a la página 1 si el usuario busca algo o cambia de categoría
  useEffect(() => {
    setPaginaActual(1);
  }, [busquedaDebounced, categoriaActiva]);

  // 4. Fetch dinámico de productos
  useEffect(() => {
    let activo = true;
    setLoading(true);

    const url = new URL("https://localhost:7045/api/productos/paginados");
    url.searchParams.append("pagina", paginaActual);
    url.searchParams.append("limite", limite);
    
    if (busqueda.trim() !== "") {
      url.searchParams.append("buscar", busqueda);
    }
    
    // El traductor mágico: si eligió una categoría, buscamos su ID numérico
    if (categoriaActiva !== "Todos") {
      const catEncontrada = categoriasBase.find(c => (c.descripcion || c.Descripcion) === categoriaActiva);
      if (catEncontrada) {
        url.searchParams.append("idCategoria", catEncontrada.id || catEncontrada.Id);
      }
    }

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar productos");
        return res.json();
      })
      .then((data) => {
        if (activo) {
          setProductos(data.items);
          setTotalPaginas(data.totalPaginas);
          setError(null);
        }
      })
      .catch((err) => {
        if (activo) setError(err.message);
      })
      .finally(() => {
        if (activo) setLoading(false);
      });
     
      if (busquedaDebounced.trim() !== "") { // <-- CAMBIO ACA
      url.searchParams.append("buscar", busquedaDebounced); // <-- CAMBIO ACA
    }

    return () => { activo = false; };
  }, [paginaActual, busquedaDebounced, categoriaActiva, categoriasBase]);

  // 5. El ordenamiento por precio o nombre lo aplicamos sobre la página actual
  const productosOrdenados = useMemo(() => {
    let resultado = [...productos];
    if (orden === "precio_asc") resultado.sort((a, b) => a.precio - b.precio);
    if (orden === "precio_desc") resultado.sort((a, b) => b.precio - a.precio);
    if (orden === "nombre") resultado.sort((a, b) => a.nombre.localeCompare(b.nombre));
    return resultado;
  }, [productos, orden]);

  return {
    productos: productosOrdenados,
    categorias,
    loading,
    error,
    categoriaActiva,
    setCategoriaActiva,
    busqueda,
    setBusqueda,
    orden,
    setOrden,
    paginaActual,
    totalPaginas,
    setPaginaActual
  };
}
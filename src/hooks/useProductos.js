import { useState, useEffect, useMemo } from "react";
import { obtenerProductos } from "../services/productosService";

function normalizarTexto(texto) {
  return (texto ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}


export function useProductos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [categoriaActiva, setCategoriaActiva] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");
  const [orden, setOrden] = useState("relevancia");

  useEffect(() => {
    let activo = true;

    setLoading(true);
    obtenerProductos()
      .then((data) => {
        if (activo) setProductos(data);
      })
      .catch((err) => {
        if (activo) setError(err.message ?? "Error al cargar productos");
      })
      .finally(() => {
        if (activo) setLoading(false);
      });

    return () => {
      activo = false; // evita setear estado si el componente se desmontó
    };
  }, []);

  const categorias = useMemo(() => {
    const unicas = [...new Set(productos.map((p) => p.categoria))].sort();
    return ["Todos", ...unicas];
  }, [productos]);

   const productosFiltrados = useMemo(() => {
    let resultado = productos.filter((p) => {
      const matchCategoria =
        categoriaActiva === "Todos" ||
        normalizarTexto(p.categoria) === normalizarTexto(categoriaActiva);

      const matchBusqueda =
        normalizarTexto(p.nombre).includes(normalizarTexto(busqueda)) ||
        normalizarTexto(p.descripcion).includes(normalizarTexto(busqueda));

      return matchCategoria && matchBusqueda;
    });


    if (orden === "precio_asc") {
      resultado = [...resultado].sort((a, b) => a.precio - b.precio);
    }
    if (orden === "precio_desc") {
      resultado = [...resultado].sort((a, b) => b.precio - a.precio);
    }
    if (orden === "nombre") {
      resultado = [...resultado].sort((a, b) => a.nombre.localeCompare(b.nombre));
    }

    return resultado;
  }, [productos, categoriaActiva, busqueda, orden]);

  return {
    productos: productosFiltrados,
    categorias,
    loading,
    error,
    categoriaActiva,
    setCategoriaActiva,
    busqueda,
    setBusqueda,
    orden,
    setOrden,
  };
}
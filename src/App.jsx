import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import InicioPage from "./pages/InicioPage";
import CatalogoPage from "./pages/CatalogoPage";
import LoginPage from "./pages/LoginPage";
import RegistroPage from "./pages/RegistroPage";
import CarritoPage from "@/pages/CarritoPage";
import CartToast from "@/components/carrito/CartToast";

export default function App() {
  return (
    <BrowserRouter>
      {/* Contenedor principal con el color base oscuro y prevención de scroll horizontal */}
      <div className="relative min-h-screen w-full bg-[#0f1711] text-emerald-50 selection:bg-emerald-700 selection:text-white overflow-x-hidden">
        
        {/* --- INICIO DE FONDOS Y BRILLOS (Estilo Figma) --- */}
        {/* Capa 1: Textura de hojas de fondo (Fixed para que no se corte al scrollear) */}
        <div 
          className="fixed inset-0 opacity-20 mix-blend-color-burn pointer-events-none z-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=2000&auto=format&fit=crop')",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        
        {/* Capa 2: Degradado para fundir la imagen con el fondo oscuro */}
        <div className="fixed inset-0 bg-gradient-to-b from-transparent via-[#0f1711]/80 to-[#0f1711] pointer-events-none z-0" />
        
        {/* Capa 3: Brillo abstracto esmeralda (Arriba a la derecha) */}
        <div className="fixed top-0 -right-32 w-[600px] h-[600px] rounded-full opacity-20 blur-[100px] bg-emerald-700 mix-blend-screen pointer-events-none z-0" />
        
        {/* Capa 4: Brillo abstracto dorado (Abajo a la izquierda) */}
        <div className="fixed bottom-0 -left-32 w-[500px] h-[500px] rounded-full opacity-10 blur-[120px] bg-[#d4af37] mix-blend-screen pointer-events-none z-0" />
        {/* --- FIN DE FONDOS --- */}

        {/* Contenido real de la página (z-10 para que quede por encima de los brillos) */}
        <div className="relative z-10 flex min-h-screen w-full flex-col">
          <Navbar />
          
          <main className="w-full flex-grow">
            <Routes>
              <Route path="/" element={<InicioPage />} />
              <Route path="/catalogo" element={<CatalogoPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/registro" element={<RegistroPage />} />
              <Route path="/carrito" element={<CarritoPage />} />
            </Routes>
          </main>

          <CartToast />
        </div>
      </div>
    </BrowserRouter>
  );
}
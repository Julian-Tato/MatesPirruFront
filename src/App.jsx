import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import InicioPage from "./pages/InicioPage";
import CatalogoPage from "./pages/CatalogoPage";
import LoginPage from "./pages/LoginPage";
import RegistroPage from "./pages/RegistroPage";

export default function App() {
  return (
    <BrowserRouter>
      {/* Contenedor principal que mantiene el fondo de toda la web */}
      <div className="min-h-screen bg-neutral-50">
        
        {/* El Navbar queda anclado acá y no se recarga */}
        <Navbar />
        
        {/* El main inyecta el contenido de cada página */}
        <main className="w-full">
          <Routes>
            <Route path="/" element={<InicioPage />} />
            <Route path="/catalogo" element={<CatalogoPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registro" element={<RegistroPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
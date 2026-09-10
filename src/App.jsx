import { BrowserRouter, Routes, Route } from "react-router-dom";
//import { GoogleOAuthProvider } from "@react-oauth/google"; // <--- Importamos el proveedor
import Navbar from "./components/layout/Navbar";
import InicioPage from "./pages/InicioPage";
import CatalogoPage from "./pages/CatalogoPage";
import LoginPage from "./pages/LoginPage";
import RegistroPage from "./pages/RegistroPage";
import CarritoPage from "@/pages/CarritoPage";
import CartToast from "@/components/carrito/CartToast";

export default function App() {
  return (
    /* Reemplazá el ID de abajo por el real de Google Cloud cuando lo tengan con Tato */
    //<GoogleOAuthProvider clientId="TU_CLIENT_ID_DE_GOOGLE.apps.googleusercontent.com">
      <BrowserRouter>
        <div className="min-h-screen bg-neutral-50 relative">
          <Navbar />
          
          <main className="w-full">
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
      </BrowserRouter>
    //</GoogleOAuthProvider>
  );
}
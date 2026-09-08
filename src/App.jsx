import { BrowserRouter, Routes, Route } from 'react-router-dom';
import InicioPage from "./pages/InicioPage";
import CatalogoPage from "./pages/CatalogoPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InicioPage />} />
        <Route path="/catalogo" element={<CatalogoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
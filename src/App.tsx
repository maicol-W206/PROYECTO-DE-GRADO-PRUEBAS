import { Routes, Route, Navigate, Link } from "react-router-dom";
import B2BConstructionPartsApp from "./pages/B2BConstructionPartsApp"; 
import Encontrarpieza from "./pages/Encontrarpieza";
import Catalogoproductos from "./pages/Catalogo/catalogoproductos";
import ProductDetail from "./pages/ProductDetail";
import Admin from "./pages/Admin/Admin";
import Asesor from "./pages/Asesor/Asesor";

function App() {
  return (
    <>

      <Routes>
        <Route path="/" element={<B2BConstructionPartsApp />} />
        <Route path="/encontrar-pieza" element={<Encontrarpieza />} />
        <Route path="/catalogo" element={<Catalogoproductos />} />
        <Route path="/catalogo/producto/:sku" element={<ProductDetail />} />
        <Route path="/catalogo/:category" element={<Catalogoproductos />} />
        <Route path="/encontrar-pieza/catalogo" element={<Catalogoproductos />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/asesor" element={<Asesor />} />

        {/* 🔥 seguridad */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
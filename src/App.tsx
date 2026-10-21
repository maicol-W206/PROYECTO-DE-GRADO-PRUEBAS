import { Routes, Route, Navigate } from "react-router-dom";
import B2BConstructionPartsApp from "./pages/B2BConstructionPartsApp";
import Encontrarpieza from "./pages/Encontrarpieza/Encontrarpieza";
import Catalogoproductos from "./pages/Catalogo/catalogoproductos";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Admin from "./pages/Admin/Admin";
import Asesor from "./pages/Asesor/Asesor";
import Login from "./pages/Login/Login";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<B2BConstructionPartsApp />} />
      <Route path="/encontrar-pieza" element={<Encontrarpieza />} />
      <Route path="/catalogo" element={<Catalogoproductos />} />
      <Route path="/catalogo/producto/:sku" element={<ProductDetail />} />
      <Route path="/catalogo/:category" element={<Catalogoproductos />} />
      <Route path="/encontrar-pieza/catalogo" element={<Catalogoproductos />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/asesor" element={<Asesor />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
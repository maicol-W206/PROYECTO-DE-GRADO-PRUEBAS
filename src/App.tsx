import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import B2BConstructionPartsApp from "./pages/B2BConstructionPartsApp";
import Encontrarpieza from "./pages/EncontrarPieza/Encontrarpieza";
import Catalogoproductos from "./pages/Catalogo/catalogoproductos";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Admin from "./pages/Admin/Admin";
import Asesor from "./pages/Asesor/Asesor";
import Login from "./pages/Login/Login";
import { ModalSubirPlano } from "./components/modals/ModalSubirPlano";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <Routes>
        <Route path="/" element={<B2BConstructionPartsApp />} />
        <Route path="/encontrar-pieza" element={<Encontrarpieza />} />
        <Route path="/catalogo" element={<Catalogoproductos />} />
        <Route path="/catalogo/producto/:sku" element={<ProductDetail />} />
        <Route path="/catalogo/:category" element={<Catalogoproductos />} />
        <Route path="/encontrar-pieza/catalogo" element={<Catalogoproductos />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin onOpenModal={handleOpenModal} />} />
        <Route path="/asesor" element={<Asesor onOpenModal={handleOpenModal} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Modal global de subida */}
      <ModalSubirPlano
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}
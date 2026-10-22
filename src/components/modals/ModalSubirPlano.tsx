import React, { useState } from 'react';
import './modals.css';

interface ModalSubirPlanoProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

interface RespuestaBackend {
  message?: string;
  error?: string;
  esDuplicado?: boolean;
}

export const ModalSubirPlano: React.FC<ModalSubirPlanoProps> = ({ isOpen, onClose, onSuccess }) => {
  const [archivo, setArchivo] = useState<File | null>(null);
  const [mensaje, setMensaje] = useState<{ texto: string; tipo: 'exito' | 'error' | 'advertencia' } | null>(null);
  const [cargando, setCargando] = useState<boolean>(false);
  const [esPendiente, setEsPendiente] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setArchivo(e.target.files[0]);
      setMensaje(null);
      setEsPendiente(false);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!archivo) return;

    setCargando(true);
    setMensaje(null);

    const formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('solicitante', 'Asesor');

    try {
      const res = await fetch('http://localhost:5000/api/piezas/upload', {
        method: 'POST',
        body: formData,
      });

      const data: RespuestaBackend = await res.json();

      if (res.ok) {
        setMensaje({
          texto: data.message || 'Solicitud enviada al administrador con éxito.',
          tipo: 'exito',
        });
        setArchivo(null);
        if (onSuccess) onSuccess();
      } else {
        const errorTexto = data.error || '';

        // Detecta si es una solicitud duplicada/pendiente o error de consulta
        if (
          res.status === 400 ||
          data.esDuplicado ||
          errorTexto.toLowerCase().includes('consultar') ||
          errorTexto.toLowerCase().includes('duplicado') ||
          errorTexto.toLowerCase().includes('ya existe')
        ) {
          setEsPendiente(true);
          setMensaje({
            texto: 'Este archivo ya fue enviado y se encuentra en estado pendiente de aprobación por el administrador.',
            tipo: 'advertencia',
          });
        } else {
          setMensaje({
            texto: errorTexto || 'Ocurrió un error al procesar el archivo.',
            tipo: 'error',
          });
        }
      }
    } catch (error) {
      console.error('Error al subir:', error);
      setMensaje({
        texto: 'No se pudo conectar con el servidor backend.',
        tipo: 'error',
      });
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button onClick={onClose} className="modal-close-btn">✕</button>

        <h2 className="modal-title">Subir Plano o Ficha Técnica (.PDF / .DXF)</h2>
        <p className="modal-subtitle">
          Verificación automática de duplicados directamente contra la base de datos MySQL.
        </p>

        <form onSubmit={handleUpload}>
          <input
            type="file"
            accept=".pdf,.dxf"
            onChange={handleFileChange}
            className="modal-file-input"
          />

          {mensaje && (
            <div
              className={`modal-alert ${
                mensaje.tipo === 'exito'
                  ? 'modal-alert-exito'
                  : mensaje.tipo === 'advertencia'
                  ? 'modal-alert-warning'
                  : 'modal-alert-error'
              }`}
            >
              {mensaje.tipo === 'exito' ? '🎉' : mensaje.tipo === 'advertencia' ? '🕒' : '⚠️'}{' '}
              {mensaje.texto}
            </div>
          )}

          <button
            type="submit"
            disabled={!archivo || cargando || esPendiente}
            className={`modal-btn modal-btn-primary modal-btn-full ${
              !archivo || cargando || esPendiente ? 'modal-btn-disabled' : ''
            }`}
          >
            {cargando
              ? 'Procesando...'
              : esPendiente
              ? 'Solicitud Pendiente'
              : 'Registrar en Base de Datos'}
          </button>
        </form>
      </div>
    </div>
  );
};
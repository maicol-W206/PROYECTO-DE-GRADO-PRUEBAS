import React from 'react';
import './modals.css';

export interface Solicitud {
  id: number;
  codigo: string;
  titulo: string;
  descripcion: string;
  solicitante: string;
  tipo: string;
  estado: 'Pendiente' | 'Aprobada' | 'Rechazada';
  fecha_creacion?: string;
}

interface ModalDetalleProps {
  isOpen: boolean;
  solicitud: Solicitud | null;
  onClose: () => void;
  onCambiarEstado?: (id: number, estado: 'Aprobada' | 'Rechazada') => void;
}

export const ModalDetalleSolicitud: React.FC<ModalDetalleProps> = ({
  isOpen,
  solicitud,
  onClose,
  onCambiarEstado,
}) => {
  if (!isOpen || !solicitud) return null;

  const matchPdf = solicitud.descripcion ? solicitud.descripcion.match(/\/docs\/[^\s]+/) : null;
  const urlPdf = matchPdf ? `http://localhost:5000${matchPdf[0]}` : null;

  const badgeClass =
    solicitud.estado === 'Pendiente'
      ? 'badge-pendiente'
      : solicitud.estado === 'Aprobada'
      ? 'badge-aprobada'
      : 'badge-rechazada';

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button onClick={onClose} className="modal-close-btn">✕</button>

        <h2 className="modal-title">
          {solicitud.titulo} <small className="modal-subtitle">({solicitud.codigo})</small>
        </h2>

        <div className="modal-description">
          <p><strong>Solicitante:</strong> {solicitud.solicitante || 'Asesor'}</p>
          <p><strong>Tipo:</strong> {solicitud.tipo}</p>
          <p>
            <strong>Estado:</strong>
            <span className={`badge-estado ${badgeClass}`}>{solicitud.estado}</span>
          </p>
          <p><strong>Descripción:</strong> {solicitud.descripcion}</p>
          {solicitud.fecha_creacion && (
            <p><strong>Fecha:</strong> {new Date(solicitud.fecha_creacion).toLocaleString()}</p>
          )}
        </div>

        {urlPdf && (
          <div style={{ marginBottom: '20px' }}>
            <a
              href={urlPdf}
              target="_blank"
              rel="noopener noreferrer"
              className="modal-btn modal-btn-info"
            >
              📄 Abrir Plano / Ficha en Nueva Pestaña
            </a>
          </div>
        )}

        {solicitud.estado === 'Pendiente' && onCambiarEstado && (
          <div className="modal-actions modal-actions-border">
            <button
              onClick={() => {
                onCambiarEstado(solicitud.id, 'Aprobada');
                onClose();
              }}
              className="modal-btn modal-btn-success modal-btn-flex"
            >
              ✓ Aprobar
            </button>
            <button
              onClick={() => {
                onCambiarEstado(solicitud.id, 'Rechazada');
                onClose();
              }}
              className="modal-btn modal-btn-danger modal-btn-flex"
            >
              ✕ Rechazar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
import React from 'react';
import './modals.css';

interface ModalConfirmacionProps {
  isOpen: boolean;
  titulo: string;
  mensaje: string;
  textoConfirmar?: string;
  tipoAccion?: 'danger' | 'primary';
  onConfirm: () => void;
  onClose: () => void;
}

export const ModalConfirmacion: React.FC<ModalConfirmacionProps> = ({
  isOpen,
  titulo,
  mensaje,
  textoConfirmar = 'Confirmar',
  tipoAccion = 'primary',
  onConfirm,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-confirmacion-content">
        <h3 className="modal-confirmacion-title">{titulo}</h3>
        <p className="modal-confirmacion-mensaje">{mensaje}</p>

        <div className="modal-confirmacion-actions">
          <button onClick={onClose} className="btn-modal-cancelar">
            Cancelar
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`btn-modal-confirmar ${tipoAccion}`}
          >
            {textoConfirmar}
          </button>
        </div>
      </div>
    </div>
  );
};
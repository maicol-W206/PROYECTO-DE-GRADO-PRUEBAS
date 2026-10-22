export { ModalSubirPlano } from './ModalSubirPlano';
export { ModalDetalleSolicitud } from './ModalDetalleSolicitud';
export { ModalConfirmacion } from './ModalConfirmacion';
const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
};

const modalStyle: React.CSSProperties = {
  backgroundColor: '#fff',
  padding: '25px',
  borderRadius: '12px',
  width: '100%',
  maxWidth: '450px',
  position: 'relative',
  boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
};

const closeButtonStyle: React.CSSProperties = {
  position: 'absolute',
  top: '15px',
  right: '15px',
  border: 'none',
  background: 'none',
  cursor: 'pointer',
  fontSize: '18px',
  color: '#666',
};
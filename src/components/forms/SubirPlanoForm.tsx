import React, { useState } from 'react';

interface SubirPlanoFormProps {
  onClose: () => void;
  esAsesor?: boolean;
}

export const SubirPlanoForm: React.FC<SubirPlanoFormProps> = ({ onClose, esAsesor = false }) => {
  const [archivo, setArchivo] = useState<File | null>(null);
  const [cargando, setCargando] = useState(false);
  const [mensajeExito, setMensajeExito] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setArchivo(e.target.files[0]);
      setError('');
      setMensajeExito('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!archivo) {
      setError('Por favor selecciona un archivo PDF o DXF.');
      return;
    }

    setCargando(true);
    setError('');
    setMensajeExito('');

    const formData = new FormData();
    formData.append('archivo', archivo);

    try {
      const url = `http://localhost:5000/api/piezas/upload${esAsesor ? '?rol=asesor' : ''}`;
      const res = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        if (esAsesor) {
          setMensajeExito('📩 Se ha enviado la petición al administrador.');
        } else {
          setMensajeExito('🎉 Ficha técnica registrada e integrada con éxito.');
        }
        setArchivo(null);
      } else {
        setError(data.error || 'Error al procesar el archivo.');
      }
    } catch (err) {
      console.error('Error de red:', err);
      setError('No se pudo conectar con el servidor.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        padding: '24px',
        borderRadius: '12px',
        maxWidth: '480px',
        width: '100%',
        boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
        fontFamily: 'sans-serif'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <h3 style={{ margin: 0, fontSize: '18px', color: '#0f172a' }}>
            Subir Plano o Ficha Técnica (.PDF / .DXF)
          </h3>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#64748b' }}
          >
            ✕
          </button>
        </div>

        <p style={{ color: '#64748b', fontSize: '13px', marginBottom: '15px' }}>
          Verificación automática de duplicados directamente contra la base de datos MySQL.
        </p>

        {error && (
          <div style={{
            backgroundColor: '#fef2f2',
            color: '#dc2626',
            border: '1px solid #fecaca',
            padding: '10px',
            borderRadius: '6px',
            fontSize: '13px',
            marginBottom: '15px'
          }}>
            {error}
          </div>
        )}

        {mensajeExito && (
          <div style={{
            backgroundColor: esAsesor ? '#eff6ff' : '#dcfce7',
            color: esAsesor ? '#1e40af' : '#15803d',
            border: `1px solid ${esAsesor ? '#bfdbfe' : '#bbf7d0'}`,
            padding: '12px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 'bold',
            marginBottom: '15px',
            textAlign: 'center'
          }}>
            {mensajeExito}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input
              type="file"
              accept=".pdf,.dxf"
              onChange={handleFileChange}
              style={{ display: 'none' }}
              id="archivo-input"
            />
            <label
              htmlFor="archivo-input"
              style={{
                padding: '8px 16px',
                border: '1px solid #cbd5e1',
                borderRadius: '6px',
                backgroundColor: '#f8fafc',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: 'bold',
                color: '#334155'
              }}
            >
              Seleccionar archivo
            </label>
            <span style={{ fontSize: '13px', color: '#475569', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {archivo ? archivo.name : 'Sin archivo seleccionado'}
            </span>
          </div>

          <button
            type="submit"
            disabled={cargando || !archivo}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: cargando || !archivo ? '#cbd5e1' : '#2563eb',
              color: '#ffffff',
              fontWeight: 'bold',
              fontSize: '14px',
              cursor: cargando || !archivo ? 'not-allowed' : 'pointer'
            }}
          >
            {cargando
              ? 'Procesando...'
              : esAsesor
              ? 'Enviar Petición al Administrador'
              : 'Registrar en Base de Datos'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubirPlanoForm;
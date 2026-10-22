import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SubirPlanoForm from '../../components/forms/SubirPlanoForm';
import Login from '../Login/Login';

export interface Solicitud {
  id: number;
  codigo?: string;
  titulo?: string;
  nombre?: string;
  descripcion?: string;
  tipo?: string;
  estado?: string;
  archivo?: string;
}

export default function Asesor() {
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('Todas');
  const [usuario, setUsuario] = useState<string | null>(() => {
    const sesion = localStorage.getItem('usuario');
    if (sesion) {
      try {
        const parsed = JSON.parse(sesion);
        return parsed.nombre || parsed.nombreUsuario || parsed;
      } catch {
        return sesion;
      }
    }
    return null;
  });
  const [mostrarModalSubir, setMostrarModalSubir] = useState(false);

  const cargarSolicitudes = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/piezas');
      if (res.ok) {
        const data = await res.json();
        setSolicitudes(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error('Error al cargar datos:', error);
    }
  };

  useEffect(() => {
    if (usuario) {
      cargarSolicitudes();
    }
  }, [usuario]);

  if (!usuario) {
    return (
      <Login
        tipoPanel="asesor"
        onLoginExitoso={(usr) => setUsuario(usr)}
      />
    );
  }

  const solicitudesFiltradas = solicitudes.filter((sol) => {
    const estadoNorm = (sol.estado || 'Pendiente').toLowerCase();
    const filtroNorm = filtroEstado.toLowerCase();

    const coincideEstado =
      filtroEstado === 'Todas' ||
      estadoNorm === filtroNorm ||
      (filtroNorm.includes('pendiente') && estadoNorm.includes('pendiente')) ||
      (filtroNorm.includes('aprobada') && estadoNorm.includes('aprobada')) ||
      (filtroNorm.includes('rechazada') && estadoNorm.includes('rechazada'));

    const busqNorm = busqueda.toLowerCase().trim();
    const titNorm = (sol.titulo || sol.nombre || '').toLowerCase();
    const codNorm = (sol.codigo || '').toLowerCase();

    const coincideTexto = !busqNorm || titNorm.includes(busqNorm) || codNorm.includes(busqNorm);

    return coincideEstado && coincideTexto;
  });

  const handleCerrarSesion = () => {
    localStorage.removeItem('usuario');
    setUsuario(null);
  };

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <header style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', padding: '15px 30px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '24px' }}>⚙️</span>
            <h1 style={{ fontSize: '18px', margin: 0, textTransform: 'lowercase', color: '#0f172a' }}>
              metal mecánica el imperio <span style={{ color: '#2563eb', fontSize: '12px' }}>panel de asesores</span>
            </h1>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <Link to="/" style={{ color: '#475569', textDecoration: 'none' }}>volver sitio</Link>
            <span style={{ fontWeight: 'bold', color: '#2563eb' }}>👤 {usuario}</span>
            <button
              onClick={handleCerrarSesion}
              style={{
                backgroundColor: '#ef4444',
                color: '#fff',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '6px',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: '1200px', margin: '30px auto', padding: '0 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
          <div>
            <h2 style={{ fontSize: '28px', margin: '0 0 5px 0', color: '#0f172a' }}>Panel de Asesores</h2>
            <p style={{ margin: 0, color: '#64748b' }}>Sube planos y consulta el estado de tus peticiones</p>
          </div>

          <button
            onClick={() => setMostrarModalSubir(true)}
            style={{
              backgroundColor: '#2563eb',
              color: '#fff',
              border: 'none',
              padding: '10px 18px',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            + Solicitar Subida de Plano
          </button>
        </div>

        {/* Buscador y Píldoras de Filtro */}
        <div style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', marginBottom: '20px', display: 'flex', gap: '15px' }}>
          <input
            type="text"
            placeholder="🔍 Buscar peticiones o fichas..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            style={{ flex: 1, padding: '10px 15px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
          />

          <div style={{ display: 'flex', gap: '8px' }}>
            {['Todas', 'Pendientes', 'Aprobadas', 'Rechazadas'].map((f) => (
              <button
                key={f}
                onClick={() => setFiltroEstado(f)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: filtroEstado === f ? '#2563eb' : '#f1f5f9',
                  color: filtroEstado === f ? '#fff' : '#475569',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Tabla */}
        <div style={{ backgroundColor: '#fff', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', textAlign: 'left', fontSize: '13px', color: '#64748b' }}>
                <th style={{ padding: '12px 20px' }}>CÓDIGO</th>
                <th style={{ padding: '12px 20px' }}>TÍTULO / FICHA</th>
                <th style={{ padding: '12px 20px' }}>ESTADO</th>
                <th style={{ padding: '12px 20px' }}>DOCUMENTO</th>
              </tr>
            </thead>
            <tbody>
              {solicitudesFiltradas.map((item) => {
                const estNorm = (item.estado || '').toLowerCase();
                const esPendiente = estNorm.includes('pendiente');
                const esRechazada = estNorm.includes('rechazada');

                return (
                  <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9', fontSize: '14px' }}>
                    <td style={{ padding: '12px 20px', fontWeight: 'bold' }}>{item.codigo || `ID-${item.id}`}</td>
                    <td style={{ padding: '12px 20px' }}>{item.titulo || item.nombre || 'FICHA TÉCNICA'}</td>
                    <td style={{ padding: '12px 20px' }}>
                      <span
                        style={{
                          padding: '4px 10px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: 'bold',
                          backgroundColor: esPendiente ? '#fef3c7' : esRechazada ? '#fee2e2' : '#dcfce7',
                          color: esPendiente ? '#92400e' : esRechazada ? '#991b1b' : '#166534',
                        }}
                      >
                        {item.estado || 'Aprobada'}
                      </span>
                    </td>
                    <td style={{ padding: '12px 20px' }}>
                      {item.archivo && (
                        <a
                          href={`http://localhost:5000/docs/${item.archivo}`}
                          target="_blank"
                          rel="noreferrer"
                          style={{ color: '#2563eb', fontWeight: 'bold', textDecoration: 'none' }}
                        >
                          📄 Ver Documento
                        </a>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>

      {mostrarModalSubir && (
        <SubirPlanoForm
          esAsesor={true}
          onClose={() => {
            setMostrarModalSubir(false);
            cargarSolicitudes();
          }}
        />
      )}
    </div>
  );
}
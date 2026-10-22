import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SubirPlanoForm from '../../components/forms/SubirPlanoForm';
import Login from '../Login/Login';
import { ModalEliminarPdf } from '../../components/modals/ModalEliminarPdf';
import './Admin.css';

export interface Solicitud {
  id: number;
  codigo?: string;
  titulo?: string;
  nombre?: string;
  descripcion?: string;
  solicitante?: string;
  tipo?: string;
  estado?: 'Pendiente' | 'Aprobada' | 'Rechazada' | string;
  fecha_creacion?: string;
  archivo?: string;
  origen?: 'piezas' | 'solicitudes';
}

export interface AdminProps {
  onOpenModal?: () => void;
}

export default function Admin({ onOpenModal }: AdminProps) {
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
  const [rolUsuario, setRolUsuario] = useState<string | null>('admin');
  const [mostrarModalSubir, setMostrarModalSubir] = useState(false);
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);

  const cargarSolicitudes = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/piezas');
      if (res.ok) {
        const data = await res.json();
        setSolicitudes(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error('Error al cargar datos del panel:', error);
    }
  };

  useEffect(() => {
    if (usuario) {
      cargarSolicitudes();
    }
  }, [usuario]);

  const handleAprobarSolicitud = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:5000/api/solicitudes/${id}/aprobar`, {
        method: 'PUT',
      });
      if (res.ok) {
        cargarSolicitudes();
      }
    } catch (error) {
      console.error('Error al aprobar solicitud:', error);
    }
  };

  const handleRechazarSolicitud = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:5000/api/solicitudes/${id}/rechazar`, {
        method: 'PUT',
      });
      if (res.ok) {
        cargarSolicitudes();
      }
    } catch (error) {
      console.error('Error al rechazar solicitud:', error);
    }
  };

  if (!usuario) {
    return (
      <Login
        tipoPanel="admin"
        onLoginExitoso={(usr, rol) => {
          setUsuario(usr);
          setRolUsuario(rol || 'admin');
        }}
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

  const totalPendientes = solicitudes.filter((s) => (s.estado || '').toLowerCase().includes('pendiente')).length;
  const totalAprobadas = solicitudes.filter((s) => (s.estado || '').toLowerCase().includes('aprobada')).length;
  const totalRechazadas = solicitudes.filter((s) => (s.estado || '').toLowerCase().includes('rechazada')).length;

  const handleCerrarSesion = () => {
    localStorage.removeItem('usuario');
    setUsuario(null);
  };

  return (
    <div className="admin-container">
      <header className="admin-header">
        <div className="admin-header-content">
          <div className="admin-logo-box">
            <div className="admin-logo-icon">⚙️</div>
            <div>
              <h1 className="admin-logo-title">metal mecánica el imperio</h1>
              <span className="admin-logo-subtitle">Soluciones B2B</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <Link to="/" style={{ color: '#475569', textDecoration: 'none', fontWeight: 500 }}>
              volver sitio
            </Link>
            <span style={{ fontWeight: 'bold', color: '#2563eb' }}>
              👤 {usuario} {rolUsuario ? `(${rolUsuario})` : ''}
            </span>
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
            <h2 style={{ fontSize: '28px', margin: '0 0 5px 0', color: '#0f172a' }}>Panel de Administración</h2>
            <p style={{ margin: 0, color: '#64748b' }}>Gestiona las solicitudes de cambios y el contenido del sitio</p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => setMostrarModalEliminar(true)}
              style={{
                backgroundColor: '#dc2626',
                color: '#fff',
                border: 'none',
                padding: '10px 18px',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              🗑️ Eliminar PDF
            </button>

            <button
              onClick={() => {
                if (onOpenModal) onOpenModal();
                setMostrarModalSubir(true);
              }}
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
              + Cargar Plano / Ficha
            </button>
          </div>
        </div>

        {/* 3 Tarjetas de Métricas */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', marginBottom: '25px' }}>
          <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '24px', fontWeight: 'bold' }}>
              <span>🕒</span> <span>{totalPendientes}</span>
            </div>
            <p style={{ margin: '10px 0 0 0', fontWeight: 'bold', color: '#334155' }}>Pendientes</p>
            <small style={{ color: '#94a3b8' }}>Requieren atención</small>
          </div>

          <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '24px', fontWeight: 'bold', color: '#16a34a' }}>
              <span>✅</span> <span>{totalAprobadas}</span>
            </div>
            <p style={{ margin: '10px 0 0 0', fontWeight: 'bold', color: '#334155' }}>Aprobadas</p>
            <small style={{ color: '#94a3b8' }}>Fichas registradas</small>
          </div>

          <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '24px', fontWeight: 'bold', color: '#dc2626' }}>
              <span>❌</span> <span>{totalRechazadas}</span>
            </div>
            <p style={{ margin: '10px 0 0 0', fontWeight: 'bold', color: '#334155' }}>Rechazadas</p>
            <small style={{ color: '#94a3b8' }}>Últimos 30 días</small>
          </div>
        </div>

        {/* Buscador y Filtros */}
        <div style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', marginBottom: '20px', display: 'flex', gap: '15px' }}>
          <input
            type="text"
            placeholder="🔍 Buscar solicitudes o fichas..."
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
        {solicitudesFiltradas.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '50px 0', color: '#94a3b8' }}>
            No se encontraron solicitudes o fichas registradas.
          </div>
        ) : (
          <div style={{ backgroundColor: '#fff', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', textAlign: 'left', fontSize: '13px', color: '#64748b' }}>
                  <th style={{ padding: '12px 20px' }}>CÓDIGO / ID</th>
                  <th style={{ padding: '12px 20px' }}>TÍTULO / FICHA</th>
                  <th style={{ padding: '12px 20px' }}>TIPO</th>
                  <th style={{ padding: '12px 20px' }}>ESTADO</th>
                  <th style={{ padding: '12px 20px' }}>ACCIONES</th>
                </tr>
              </thead>
              <tbody>
                {solicitudesFiltradas.map((item) => {
                  const estNorm = (item.estado || '').toLowerCase();
                  const esPendiente = estNorm.includes('pendiente');
                  const esRechazada = estNorm.includes('rechazada');

                  return (
                    <tr key={`${item.origen || 'p'}-${item.id}`} style={{ borderBottom: '1px solid #f1f5f9', fontSize: '14px' }}>
                      <td style={{ padding: '12px 20px', fontWeight: 'bold' }}>{item.codigo || `ID-${item.id}`}</td>
                      <td style={{ padding: '12px 20px' }}>{item.titulo || item.nombre || 'FICHA TÉCNICA'}</td>
                      <td style={{ padding: '12px 20px', textTransform: 'capitalize' }}>{item.tipo || 'General'}</td>
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
                      <td style={{ padding: '12px 20px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                        {item.archivo && (
                          <a
                            href={`http://localhost:5000/docs/${item.archivo}`}
                            target="_blank"
                            rel="noreferrer"
                            style={{ color: '#2563eb', fontWeight: 'bold', textDecoration: 'none', marginRight: '5px' }}
                          >
                            📄 Ver
                          </a>
                        )}

                        {esPendiente && (
                          <>
                            <button
                              onClick={() => handleAprobarSolicitud(item.id)}
                              style={{
                                backgroundColor: '#16a34a',
                                color: '#fff',
                                border: 'none',
                                padding: '5px 10px',
                                borderRadius: '6px',
                                fontWeight: 'bold',
                                fontSize: '12px',
                                cursor: 'pointer',
                              }}
                            >
                              ✓ Aprobar
                            </button>

                            <button
                              onClick={() => handleRechazarSolicitud(item.id)}
                              style={{
                                backgroundColor: '#dc2626',
                                color: '#fff',
                                border: 'none',
                                padding: '5px 10px',
                                borderRadius: '6px',
                                fontWeight: 'bold',
                                fontSize: '12px',
                                cursor: 'pointer',
                              }}
                            >
                              ✕ Rechazar
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {mostrarModalSubir && (
        <SubirPlanoForm
          onClose={() => {
            setMostrarModalSubir(false);
            cargarSolicitudes();
          }}
        />
      )}

      <ModalEliminarPdf
        isOpen={mostrarModalEliminar}
        onClose={() => {
          setMostrarModalEliminar(false);
          cargarSolicitudes();
        }}
      />
    </div>
  );
}
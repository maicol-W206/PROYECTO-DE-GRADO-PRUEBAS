import React, { useState, useEffect } from 'react';

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

export const AdminDashboard: React.FC = () => {
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
  const [filtroEstado, setFiltroEstado] = useState<'Todas' | 'Pendiente' | 'Aprobada' | 'Rechazada'>('Todas');
  const [busqueda, setBusqueda] = useState<string>('');
  const [cargando, setCargando] = useState<boolean>(true);

  // Cargar solicitudes desde MySQL
  const cargarSolicitudes = async (): Promise<void> => {
    try {
      const res = await fetch('http://localhost:5000/api/solicitudes');
      if (!res.ok) throw new Error('Error en la respuesta del servidor');
      const data: Solicitud[] = await res.json();
      setSolicitudes(data);
    } catch (error) {
      console.error('Error al obtener solicitudes:', error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarSolicitudes();
  }, []);

  // Aprobar o Rechazar solicitud
  const cambiarEstado = async (id: number, nuevoEstado: 'Aprobada' | 'Rechazada'): Promise<void> => {
    try {
      const res = await fetch(`http://localhost:5000/api/solicitudes/${id}/estado`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado: nuevoEstado }),
      });

      if (res.ok) {
        await cargarSolicitudes(); // Refresca lista y contadores
      }
    } catch (error) {
      console.error('Error al actualizar estado:', error);
    }
  };

  // Métricas dinámicas calculadas desde los datos reales de MySQL
  const pendientesCount = solicitudes.filter((s) => s.estado === 'Pendiente').length;
  const aprobadasCount = solicitudes.filter((s) => s.estado === 'Aprobada').length;
  const rechazadasCount = solicitudes.filter((s) => s.estado === 'Rechazada').length;
  const totalEvaluadas = aprobadasCount + rechazadasCount;
  const tasaAprobacion = totalEvaluadas > 0 ? Math.round((aprobadasCount / totalEvaluadas) * 100) : 0;

  // Filtrado por buscador y pestañas
  const solicitudesFiltradas = solicitudes.filter((sol) => {
    const coincideEstado = filtroEstado === 'Todas' || sol.estado === filtroEstado;
    const coincideTexto =
      sol.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      sol.codigo.toLowerCase().includes(busqueda.toLowerCase()) ||
      sol.solicitante.toLowerCase().includes(busqueda.toLowerCase());
    return coincideEstado && coincideTexto;
  });

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Panel de Administración</h1>
      <p style={{ color: '#666' }}>Gestiona las solicitudes de cambios y el contenido del sitio</p>

      {/* Métricas dinámicas */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px', marginBottom: '25px' }}>
        <div style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#fff' }}>
          <h2 style={{ margin: 0, fontSize: '28px' }}>{pendientesCount}</h2>
          <p style={{ margin: 0, fontWeight: 'bold' }}>Pendientes</p>
          <small style={{ color: '#888' }}>Requieren atención</small>
        </div>
        <div style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#fff' }}>
          <h2 style={{ margin: 0, fontSize: '28px' }}>{aprobadasCount}</h2>
          <p style={{ margin: 0, fontWeight: 'bold' }}>Aprobadas</p>
          <small style={{ color: '#888' }}>Este mes</small>
        </div>
        <div style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#fff' }}>
          <h2 style={{ margin: 0, fontSize: '28px' }}>{rechazadasCount}</h2>
          <p style={{ margin: 0, fontWeight: 'bold' }}>Rechazadas</p>
          <small style={{ color: '#888' }}>Últimos 30 días</small>
        </div>
        <div style={{ padding: '15px', borderRadius: '8px', backgroundColor: '#1d4ed8', color: '#fff' }}>
          <h2 style={{ margin: 0, fontSize: '28px' }}>{tasaAprobacion}%</h2>
          <p style={{ margin: 0, fontWeight: 'bold' }}>Tasa de Aprobación</p>
          <small style={{ color: '#bfdbfe' }}>Últimos 90 días</small>
        </div>
      </div>

      {/* Buscador y Pestañas */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Buscar solicitudes..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={{ flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
        />
        {(['Todas', 'Pendiente', 'Aprobada', 'Rechazada'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFiltroEstado(tab)}
            style={{
              padding: '10px 15px',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: filtroEstado === tab ? '#2563eb' : '#e5e7eb',
              color: filtroEstado === tab ? '#fff' : '#000',
            }}
          >
            {tab === 'Todas' ? 'Todas' : `${tab}s`}
          </button>
        ))}
      </div>

      {/* Lista de Solicitudes */}
      {cargando ? (
        <p>Cargando solicitudes desde MySQL...</p>
      ) : solicitudesFiltradas.length === 0 ? (
        <p style={{ color: '#888' }}>No hay solicitudes que coincidan con la búsqueda.</p>
      ) : (
        solicitudesFiltradas.map((sol) => (
          <div
            key={sol.id}
            style={{
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              padding: '15px',
              marginBottom: '12px',
              backgroundColor: '#fff',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3>
                {sol.titulo} <small style={{ color: '#6b7280' }}>{sol.codigo}</small>
              </h3>
              <span
                style={{
                  padding: '4px 10px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  backgroundColor:
                    sol.estado === 'Pendiente' ? '#fef3c7' : sol.estado === 'Aprobada' ? '#dcfce7' : '#fee2e2',
                  color:
                    sol.estado === 'Pendiente' ? '#92400e' : sol.estado === 'Aprobada' ? '#166534' : '#991b1b',
                }}
              >
                {sol.estado}
              </span>
            </div>
            <p style={{ color: '#4b5563', margin: '8px 0' }}>{sol.descripcion}</p>
            <p style={{ fontSize: '13px', color: '#6b7280', margin: '4px 0' }}>
              Solicitante: <strong>{sol.solicitante}</strong> • {sol.tipo}
            </p>

            {sol.estado === 'Pendiente' && (
              <div style={{ marginTop: '12px', display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => cambiarEstado(sol.id, 'Aprobada')}
                  style={{
                    backgroundColor: '#16a34a',
                    color: '#fff',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                  }}
                >
                  ✓ Aprobar
                </button>
                <button
                  onClick={() => cambiarEstado(sol.id, 'Rechazada')}
                  style={{
                    backgroundColor: '#dc2626',
                    color: '#fff',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                  }}
                >
                  ✕ Rechazar
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};
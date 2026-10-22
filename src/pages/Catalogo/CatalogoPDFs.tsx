import React, { useState, useEffect } from 'react';

export interface FichaTecnica {
  id: number;
  codigo?: string;
  nombre?: string;
  titulo?: string;
  archivo?: string;
  url?: string;
  categoria?: string;
  tipo?: string;
  material?: string;
  tipo_archivo?: string;
}

export default function CatalogoPDFs() {
  const [fichas, setFichas] = useState<FichaTecnica[]>([]);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todos');

  // Cargar las fichas aprobadas directamente del Backend en MySQL
  const cargarCatalogo = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/catalogo');
      if (res.ok) {
        const data = await res.json();
        setFichas(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error('Error al conectar con la base de datos:', error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarCatalogo();
  }, []);

  // Función para forzar la descarga directa del archivo PDF/DXF
  const descargarArchivo = async (urlArchivo: string, nombreDescarga: string) => {
    try {
      const fullUrl = `http://localhost:5000${urlArchivo}`;
      const res = await fetch(fullUrl);
      const blob = await res.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = nombreDescarga;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Error al descargar el archivo:', error);
    }
  };

  // Categorías de filtrado
  const categorias = ['Todos', 'Bisagras', 'Bujes', 'Soportes', 'Lengüetas', 'Otros'];

  // Filtrado interactivo por texto y categoría
  const fichasFiltradas = fichas.filter((ficha) => {
    const busq = busqueda.toLowerCase().trim();
    const cod = (ficha.codigo || '').toLowerCase();
    const tit = (ficha.nombre || ficha.titulo || '').toLowerCase();
    const cat = (ficha.categoria || ficha.tipo || '').toLowerCase();

    const coincideTexto = !busq || cod.includes(busq) || tit.includes(busq);

    let coincideCat = true;
    if (categoriaSeleccionada !== 'Todos') {
      const catSel = categoriaSeleccionada.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const catFicha = cat.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      coincideCat = catFicha.includes(catSel);
    }

    return coincideTexto && coincideCat;
  });

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      {/* Banner Principal */}
      <section style={{ backgroundColor: '#1e293b', color: '#fff', padding: '60px 20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 'bold', margin: '0 0 10px 0' }}>Catálogo de Productos</h1>
        <p style={{ color: '#94a3b8', fontSize: '18px', margin: 0 }}>Explora nuestro catálogo completo de componentes industriales</p>
      </section>

      <main style={{ maxWidth: '1200px', margin: '30px auto', padding: '0 20px' }}>
        
        {/* Encabezado con Contador Dinámico */}
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '28px', color: '#0f172a', margin: '0 0 15px 0' }}>
            Fichas técnicas <span style={{ color: '#2563eb' }}>({fichas.length})</span>
          </h2>

          {/* Buscador de Fichas */}
          <input
            type="text"
            placeholder="Buscar ficha por código o nombre..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 18px',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              fontSize: '15px',
              marginBottom: '15px',
              boxSizing: 'border-box'
            }}
          />

          {/* Píldoras de Categorías */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {categorias.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoriaSeleccionada(cat)}
                style={{
                  padding: '8px 20px',
                  borderRadius: '20px',
                  border: '1px solid #cbd5e1',
                  backgroundColor: categoriaSeleccionada === cat ? '#2563eb' : '#ffffff',
                  color: categoriaSeleccionada === cat ? '#ffffff' : '#475569',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Listado de Fichas Técnicas */}
        {cargando ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>Cargando datos desde la base de datos...</div>
        ) : fichasFiltradas.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8', backgroundColor: '#fff', borderRadius: '8px' }}>
            No se encontraron fichas técnicas que coincidan con la búsqueda.
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', marginTop: '25px' }}>
            {fichasFiltradas.map((item) => {
              const urlArchivo = item.url || (item.archivo ? `/docs/${item.archivo}` : '');
              const fullUrl = `http://localhost:5000${urlArchivo}`;
              const nombreDescarga = item.archivo || `${item.codigo || 'FICHA'}_${item.nombre || 'Plano'}.pdf`;

              return (
                <div
                  key={item.id}
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '10px',
                    padding: '20px',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.03)',
                    display: 'flex',
                    flexDirection: 'column',
                    justify: 'space-between'
                  }}
                >
                  <div>
                    <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#2563eb', textTransform: 'uppercase' }}>
                      {item.codigo || 'FICHA'}
                    </span>
                    <h3 style={{ fontSize: '16px', color: '#0f172a', margin: '8px 0', textTransform: 'capitalize' }}>
                      {item.nombre || item.titulo || 'Sin Título'}
                    </h3>
                    <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0' }}>
                      <strong>Categoría:</strong> {item.categoria || item.tipo || 'General'}
                    </p>
                    <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 15px 0' }}>
                      <strong>Material:</strong> {item.material || 'No especificado'}
                    </p>
                  </div>

                  {urlArchivo && (
                    <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                      <a
                        href={fullUrl}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          flex: 1,
                          textAlign: 'center',
                          backgroundColor: '#2563eb',
                          color: '#ffffff',
                          padding: '9px 12px',
                          borderRadius: '6px',
                          textDecoration: 'none',
                          fontWeight: 'bold',
                          fontSize: '13px'
                        }}
                      >
                        👁️ Ver Ficha
                      </a>
                      <button
                        type="button"
                        onClick={() => descargarArchivo(urlArchivo, nombreDescarga)}
                        style={{
                          flex: 1,
                          textAlign: 'center',
                          backgroundColor: '#0284c7',
                          color: '#ffffff',
                          padding: '9px 12px',
                          borderRadius: '6px',
                          border: 'none',
                          cursor: 'pointer',
                          fontWeight: 'bold',
                          fontSize: '13px'
                        }}
                      >
                        📥 Descargar
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
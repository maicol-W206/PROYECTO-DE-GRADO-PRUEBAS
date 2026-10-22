import React, { useState, useEffect } from 'react';
import './modals.css';

export interface PiezaCatalogo {
  id: number;
  codigo?: string;
  titulo?: string;
  nombre?: string;
  descripcion?: string;
  archivo?: string;
  tipo?: string;
  categoria?: string;
  material?: string;
  origen?: 'piezas' | 'solicitudes';
}

interface ModalEliminarPdfProps {
  isOpen: boolean;
  onClose: () => void;
}

// Helper para normalizar texto (quita acentos y convierte a minúsculas)
const normalizar = (str: string = ''): string => {
  return str
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
};

export const ModalEliminarPdf: React.FC<ModalEliminarPdfProps> = ({ isOpen, onClose }) => {
  const [piezas, setPiezas] = useState<PiezaCatalogo[]>([]);
  const [busqueda, setBusqueda] = useState<string>('');
  const [categoriaSel, setCategoriaSel] = useState<string>('Todos');
  const [eliminandoId, setEliminandoId] = useState<number | null>(null);

  const cargarCatalogo = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/piezas');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setPiezas(data);
        } else {
          setPiezas([]);
        }
      }
    } catch (error) {
      console.error('Error al cargar catálogo:', error);
      setPiezas([]);
    }
  };

  useEffect(() => {
    if (isOpen) {
      cargarCatalogo();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleEliminarPieza = async (item: PiezaCatalogo) => {
    const nombreMostrar = item.titulo || item.nombre || item.codigo || item.archivo || `PDF #${item.id}`;

    if (!window.confirm(`¿Estás seguro de que deseas eliminar permanentemente el PDF "${nombreMostrar}"?`)) {
      return;
    }

    try {
      setEliminandoId(item.id);
      const origen = item.origen || 'piezas';
      const res = await fetch(`http://localhost:5000/api/piezas/${item.id}?origen=${origen}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        await cargarCatalogo();
      } else {
        const errorData = await res.json().catch(() => ({ error: 'Error al eliminar el archivo.' }));
        alert(errorData.error || 'No se pudo eliminar el archivo.');
      }
    } catch (error) {
      console.error('Error al eliminar pieza:', error);
      alert('Error de conexión con el servidor.');
    } finally {
      setEliminandoId(null);
    }
  };

  // -------------------------------------------------------------
  // LÓGICA DE FILTRADO ROBUSTA (TEXTO Y PÍLDORAS DE CATEGORÍA)
  // -------------------------------------------------------------
  const listaPiezas = Array.isArray(piezas) ? piezas : [];

  const piezasFiltradas = listaPiezas.filter((p) => {
    const busqNorm = normalizar(busqueda);

    // 1. Campos de texto
    const tituloNorm = normalizar(p.titulo || p.nombre || '');
    const codigoNorm = normalizar(p.codigo || '');
    const archivoNorm = normalizar(p.archivo || '');
    const descNorm = normalizar(p.descripcion || '');

    const coincideTexto =
      !busqNorm ||
      tituloNorm.includes(busqNorm) ||
      codigoNorm.includes(busqNorm) ||
      archivoNorm.includes(busqNorm) ||
      descNorm.includes(busqNorm);

    if (!coincideTexto) return false;

    // 2. Filtro de Píldoras de Categoría
    if (categoriaSel === 'Todos') return true;

    const catBuscada = normalizar(categoriaSel); // ej: "bisagras", "bujes", "soportes", "lenguetas", "otros"
    const catPieza = normalizar(p.categoria || p.tipo || 'otros');

    if (catBuscada === 'otros') {
      const categoriasPrincipales = ['bisagras', 'bujes', 'soportes', 'lenguetas', 'lengueta'];
      return !categoriasPrincipales.some((c) => catPieza.includes(c));
    }

    return catPieza.includes(catBuscada) || catBuscada.includes(catPieza);
  });

  const categoriasMenu = ['Todos', 'Bisagras', 'Bujes', 'Soportes', 'Lengüetas', 'Otros'];

  return (
    <div className="modal-overlay">
      <div className="modal-container modal-container-catalogo">
        <button onClick={onClose} className="modal-close-btn">✕</button>

        <h2 className="modal-catalogo-header-title">
          Fichas técnicas ({piezasFiltradas.length})
        </h2>

        <div className="modal-catalogo-body">
          {/* Buscador de Catálogo */}
          <input
            type="text"
            placeholder="Buscar por nombre, código o archivo..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="catalogo-search-box"
          />

          {/* Categorías tipo píldora */}
          <div className="catalogo-pills-container">
            {categoriasMenu.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoriaSel(cat)}
                className={`catalogo-pill-btn ${categoriaSel === cat ? 'catalogo-pill-active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid de Tarjetas */}
          {piezasFiltradas.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#94a3b8', padding: '50px 20px', fontSize: '15px' }}>
              No se encontraron fichas para la búsqueda o categoría seleccionada.
            </div>
          ) : (
            <div className="catalogo-grid">
              {piezasFiltradas.map((item) => {
                const catLabel = (item.categoria || item.tipo || 'OTRO').toUpperCase();
                const nombreTitulo = item.titulo || item.nombre || item.codigo || 'FICHA TÉCNICA';
                const urlPdf = item.archivo ? `http://localhost:5000/docs/${item.archivo}` : null;

                return (
                  <div key={`${item.origen || 'p'}-${item.id}`} className="catalogo-card">
                    {/* Header Púrpura */}
                    <div className="catalogo-card-top">
                      <span className="catalogo-card-icon">📄</span>
                      <span className="catalogo-card-category-label">{catLabel}</span>
                    </div>

                    {/* Contenido */}
                    <div className="catalogo-card-body">
                      <div className="catalogo-card-row-info">
                        <span className="catalogo-card-sku">
                          {item.codigo || `ID-${item.id}`}
                        </span>
                        <span className="catalogo-badge-pdf">PDF</span>
                      </div>

                      <h4 className="catalogo-card-title">{nombreTitulo}</h4>

                      <p className="catalogo-card-desc">
                        Ficha técnica en PDF. Consúltala en línea o elimínala del servidor.
                      </p>

                      <div className="catalogo-card-meta">
                        <span><strong>Material:</strong> {item.material || 'N/A'}</span>
                        {urlPdf && (
                          <a
                            href={urlPdf}
                            target="_blank"
                            rel="noreferrer"
                            style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 'bold' }}
                          >
                            Ver PDF
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Acción de eliminación */}
                    <div className="catalogo-card-actions">
                      <button
                        onClick={() => handleEliminarPieza(item)}
                        disabled={eliminandoId === item.id}
                        className="btn-delete-pdf-card"
                      >
                        {eliminandoId === item.id ? 'Eliminando...' : '🗑️ Eliminar PDF'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
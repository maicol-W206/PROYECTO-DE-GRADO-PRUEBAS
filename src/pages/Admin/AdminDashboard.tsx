import { useState } from "react";
import { Link } from "react-router-dom";
import SubirPlanoForm from "../../components/forms/SubirPlanoForm";

export default function AdminDashboard() {
  const [mostrarSubida, setMostrarSubida] = useState(false);

  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh", fontFamily: "system-ui, -apple-system, sans-serif", color: "#0f172a" }}>
      
      {/* 1. ENCABEZADO / HEADER */}
      <header style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #e2e8f0", padding: "1rem 2rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ backgroundColor: "#2563eb", color: "white", width: "36px", height: "36px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold" }}>
              ⚙️
            </div>
            <div>
              <h1 style={{ fontSize: "1.1rem", fontWeight: "800", margin: 0 }}>metal mecánica el imperio</h1>
              <span style={{ fontSize: "0.75rem", color: "#94a3b8" }}>Soluciones B2B</span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            <Link to="/" style={{ color: "#0f172a", textDecoration: "none", fontSize: "0.9rem", fontWeight: "500" }}>volver sitio</Link>
            <Link to="/admin" style={{ backgroundColor: "#2563eb", color: "white", padding: "0.5rem 1.25rem", borderRadius: "8px", textDecoration: "none", fontWeight: "600", fontSize: "0.9rem" }}>Acceder</Link>
          </div>
        </div>
      </header>

      {/* 2. CONTENIDO PRINCIPAL */}
      <main style={{ maxWidth: "1200px", margin: "2rem auto", padding: "0 1.5rem" }}>
        
        {/* TÍTULO Y BOTÓN DE ACCIÓN */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
          <div>
            <h2 style={{ fontSize: "2rem", fontWeight: "800", margin: "0 0 0.25rem 0" }}>Panel de Administración</h2>
            <p style={{ color: "#94a3b8", fontSize: "0.95rem", margin: 0 }}>Gestiona las solicitudes de cambios y el contenido del sitio</p>
          </div>
          <button 
            onClick={() => setMostrarSubida(!mostrarSubida)}
            style={{
              backgroundColor: mostrarSubida ? "#64748b" : "#2563eb",
              color: "white",
              border: "none",
              padding: "0.75rem 1.25rem",
              borderRadius: "8px",
              fontWeight: "700",
              cursor: "pointer"
            }}
          >
            {mostrarSubida ? "✕ Ocultar Subida de Planos" : "+ Cargar Plano / Ficha"}
          </button>
        </div>

        {/* CARTA DESPLEGABLE DE SUBIDA A MYSQL */}
        {mostrarSubida && (
          <div style={{ marginBottom: "2rem" }}>
            <SubirPlanoForm />
          </div>
        )}

        {/* TARJETAS DE MÉTRICAS (3, 2, 1, 94%) */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.25rem", marginBottom: "2rem" }}>
          
          {/* Pendientes */}
          <div style={{ backgroundColor: "white", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "1.25rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <span style={{ backgroundColor: "#fef3c7", color: "#d97706", padding: "0.5rem", borderRadius: "8px", fontSize: "1.1rem" }}>🕒</span>
              <span style={{ fontSize: "1.75rem", fontWeight: "800" }}>3</span>
            </div>
            <h3 style={{ fontSize: "1rem", fontWeight: "700", margin: "0 0 0.2rem 0" }}>Pendientes</h3>
            <span style={{ fontSize: "0.8rem", color: "#94a3b8" }}>Requieren atención</span>
          </div>

          {/* Aprobadas */}
          <div style={{ backgroundColor: "white", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "1.25rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <span style={{ backgroundColor: "#dcfce7", color: "#16a34a", padding: "0.5rem", borderRadius: "8px", fontSize: "1.1rem" }}>✓</span>
              <span style={{ fontSize: "1.75rem", fontWeight: "800" }}>2</span>
            </div>
            <h3 style={{ fontSize: "1rem", fontWeight: "700", margin: "0 0 0.2rem 0" }}>Aprobadas</h3>
            <span style={{ fontSize: "0.8rem", color: "#94a3b8" }}>Este mes</span>
          </div>

          {/* Rechazadas */}
          <div style={{ backgroundColor: "white", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "1.25rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <span style={{ backgroundColor: "#fee2e2", color: "#dc2626", padding: "0.5rem", borderRadius: "8px", fontSize: "1.1rem" }}>✕</span>
              <span style={{ fontSize: "1.75rem", fontWeight: "800" }}>1</span>
            </div>
            <h3 style={{ fontSize: "1rem", fontWeight: "700", margin: "0 0 0.2rem 0" }}>Rechazadas</h3>
            <span style={{ fontSize: "0.8rem", color: "#94a3b8" }}>Últimos 30 días</span>
          </div>

          {/* Tasa de Aprobación */}
          <div style={{ backgroundColor: "#1d4ed8", color: "white", borderRadius: "12px", padding: "1.25rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <span style={{ backgroundColor: "rgba(255,255,255,0.2)", padding: "0.5rem", borderRadius: "8px", fontSize: "1.1rem" }}>📈</span>
              <span style={{ fontSize: "1.75rem", fontWeight: "800", color: "white" }}>94%</span>
            </div>
            <h3 style={{ fontSize: "1rem", fontWeight: "700", margin: "0 0 0.2rem 0", color: "white" }}>Tasa de Aprobación</h3>
            <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.8)" }}>Últimos 90 días</span>
          </div>

        </div>

        {/* BUSCADOR Y FILTROS */}
        <div style={{ backgroundColor: "white", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "1rem 1.25rem", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", marginBottom: "2rem", flexWrap: "wrap" }}>
          <input 
            placeholder="🔍 Buscar solicitudes..." 
            style={{ flex: 1, minWidth: "250px", padding: "0.6rem 1rem", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "0.9rem", outline: "none" }}
          />
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button style={{ backgroundColor: "#2563eb", color: "white", border: "none", padding: "0.5rem 1rem", borderRadius: "6px", fontWeight: "600", fontSize: "0.85rem" }}>Todas</button>
            <button style={{ backgroundColor: "#f1f5f9", color: "#64748b", border: "none", padding: "0.5rem 1rem", borderRadius: "6px", fontWeight: "600", fontSize: "0.85rem" }}>Pendientes</button>
            <button style={{ backgroundColor: "#f1f5f9", color: "#64748b", border: "none", padding: "0.5rem 1rem", borderRadius: "6px", fontWeight: "600", fontSize: "0.85rem" }}>Aprobadas</button>
            <button style={{ backgroundColor: "#f1f5f9", color: "#64748b", border: "none", padding: "0.5rem 1rem", borderRadius: "6px", fontWeight: "600", fontSize: "0.85rem" }}>Rechazadas</button>
          </div>
        </div>

        {/* TARJETAS DE SOLICITUDES */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          
          {/* Solicitud 1 */}
          <div style={{ backgroundColor: "white", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.25rem" }}>
              <div style={{ display: "flex", gap: "1rem" }}>
                <span style={{ backgroundColor: "#dcfce7", padding: "0.5rem", borderRadius: "8px", height: "fit-content", fontSize: "1.2rem" }}>📦</span>
                <div>
                  <h4 style={{ fontSize: "1.05rem", fontWeight: "800", margin: "0 0 0.35rem 0" }}>
                    Agregar nueva bisagra de titanio <span style={{ color: "#94a3b8", fontWeight: "500", fontSize: "0.85rem", marginLeft: "0.5rem" }}>REQ-001</span>
                  </h4>
                  <p style={{ color: "#64748b", fontSize: "0.875rem", margin: "0 0 0.5rem 0" }}>
                    Solicitud para agregar una nueva línea de bisagras de titanio para aplicaciones aeroespaciales.
                  </p>
                  <p style={{ color: "#94a3b8", fontSize: "0.8rem", margin: 0 }}>
                    María González • 2026-03-20 • <span style={{ backgroundColor: "#dcfce7", color: "#166534", padding: "0.15rem 0.5rem", borderRadius: "4px", fontWeight: "600" }}>Agregar Producto</span>
                  </p>
                </div>
              </div>
              <span style={{ backgroundColor: "#fef3c7", color: "#b45309", fontSize: "0.8rem", fontWeight: "700", padding: "0.35rem 0.75rem", borderRadius: "9999px" }}>🕒 Pendiente</span>
            </div>
            <div style={{ display: "flex", gap: "0.75rem", borderTop: "1px solid #f1f5f9", paddingTop: "1rem" }}>
              <button style={{ background: "none", border: "none", color: "#2563eb", fontWeight: "700", fontSize: "0.875rem", cursor: "pointer" }}>Ver detalles</button>
              <button style={{ backgroundColor: "#16a34a", color: "white", border: "none", padding: "0.4rem 1rem", borderRadius: "6px", fontWeight: "700", fontSize: "0.85rem", cursor: "pointer" }}>✓ Aprobar</button>
              <button style={{ backgroundColor: "#dc2626", color: "white", border: "none", padding: "0.4rem 1rem", borderRadius: "6px", fontWeight: "700", fontSize: "0.85rem", cursor: "pointer" }}>✕ Rechazar</button>
            </div>
          </div>

          {/* Solicitud 2 */}
          <div style={{ backgroundColor: "white", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.25rem" }}>
              <div style={{ display: "flex", gap: "1rem" }}>
                <span style={{ backgroundColor: "#dbeafe", padding: "0.5rem", borderRadius: "8px", height: "fit-content", fontSize: "1.2rem" }}>📝</span>
                <div>
                  <h4 style={{ fontSize: "1.05rem", fontWeight: "800", margin: "0 0 0.35rem 0" }}>
                    Actualizar precio buje BUJ-002 <span style={{ color: "#94a3b8", fontWeight: "500", fontSize: "0.85rem", marginLeft: "0.5rem" }}>REQ-002</span>
                  </h4>
                  <p style={{ color: "#64748b", fontSize: "0.875rem", margin: "0 0 0.5rem 0" }}>
                    Actualización de precio por cambio en coste de materias primas.
                  </p>
                  <p style={{ color: "#94a3b8", fontSize: "0.8rem", margin: 0 }}>
                    Carlos Ruiz • 2026-03-19 • <span style={{ backgroundColor: "#dbeafe", color: "#1e40af", padding: "0.15rem 0.5rem", borderRadius: "4px", fontWeight: "600" }}>Editar Producto</span>
                  </p>
                </div>
              </div>
              <span style={{ backgroundColor: "#fef3c7", color: "#b45309", fontSize: "0.8rem", fontWeight: "700", padding: "0.35rem 0.75rem", borderRadius: "9999px" }}>🕒 Pendiente</span>
            </div>
            <div style={{ display: "flex", gap: "0.75rem", borderTop: "1px solid #f1f5f9", paddingTop: "1rem" }}>
              <button style={{ background: "none", border: "none", color: "#2563eb", fontWeight: "700", fontSize: "0.875rem", cursor: "pointer" }}>Ver detalles</button>
              <button style={{ backgroundColor: "#16a34a", color: "white", border: "none", padding: "0.4rem 1rem", borderRadius: "6px", fontWeight: "700", fontSize: "0.85rem", cursor: "pointer" }}>✓ Aprobar</button>
              <button style={{ backgroundColor: "#dc2626", color: "white", border: "none", padding: "0.4rem 1rem", borderRadius: "6px", fontWeight: "700", fontSize: "0.85rem", cursor: "pointer" }}>✕ Rechazar</button>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}
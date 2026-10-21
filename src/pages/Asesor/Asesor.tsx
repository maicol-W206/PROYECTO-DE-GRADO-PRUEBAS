import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SubirPlanoForm from "../../components/forms/SubirPlanoForm";
import Login from "../Login/Login";

export default function Asesor() {
  const [usuario, setUsuario] = useState<string | null>(null);
  const [modalSubida, setModalSubida] = useState(false);

  useEffect(() => {
    const sesionGuardada = localStorage.getItem("sesion_usuario");
    if (sesionGuardada) {
      setUsuario(sesionGuardada);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("sesion_usuario");
    localStorage.removeItem("rol_usuario");
    setUsuario(null);
    setModalSubida(false);
  };

  // SI NO HAY SESIÓN INICIADA, MOSTRAR LA PANTALLA AZUL DE LOGIN
  if (!usuario) {
    return (
      <Login 
        tipoPanel="asesor" 
        onLoginExitoso={(usr) => setUsuario(usr)} 
      />
    );
  }

  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh", fontFamily: "system-ui, -apple-system, sans-serif", color: "#0f172a" }}>
      
      {/* HEADER */}
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
            <Link to="/" style={{ color: "#0f172a", textDecoration: "none", fontSize: "0.9rem", fontWeight: "500" }}>volver a sitio</Link>
            
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <span style={{ fontSize: "0.85rem", color: "#2563eb", fontWeight: "600" }}>👤 {usuario}</span>
              <button 
                onClick={handleLogout}
                style={{ backgroundColor: "#ef4444", color: "white", border: "none", padding: "0.5rem 1rem", borderRadius: "8px", fontWeight: "600", fontSize: "0.85rem", cursor: "pointer" }}
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* CONTENIDO DE ASESOR */}
      <main style={{ maxWidth: "1200px", margin: "2rem auto", padding: "0 1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2rem" }}>
          <div>
            <h2 style={{ fontSize: "2rem", fontWeight: "800", margin: "0 0 0.25rem 0" }}>Panel de Asesor</h2>
            <p style={{ color: "#94a3b8", fontSize: "0.95rem", margin: 0 }}>Gestiona tus solicitudes de cambios</p>
          </div>
          <button 
            onClick={() => setModalSubida(true)}
            style={{ backgroundColor: "#1d4ed8", color: "white", border: "none", padding: "0.75rem 1.5rem", borderRadius: "8px", fontWeight: "700", fontSize: "0.95rem", cursor: "pointer" }}
          >
            + Nueva Solicitud
          </button>
        </div>

        {/* MÉTRICAS */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.25rem", marginBottom: "2rem" }}>
          <div style={{ backgroundColor: "white", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "1.25rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <span style={{ backgroundColor: "#dbeafe", color: "#2563eb", padding: "0.5rem", borderRadius: "8px", fontSize: "1.1rem" }}>📄</span>
              <span style={{ fontSize: "1.75rem", fontWeight: "800" }}>3</span>
            </div>
            <h3 style={{ fontSize: "1rem", fontWeight: "700", margin: "0 0 0.2rem 0" }}>Total Solicitudes</h3>
            <span style={{ fontSize: "0.8rem", color: "#94a3b8" }}>Todas las solicitudes</span>
          </div>

          <div style={{ backgroundColor: "white", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "1.25rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <span style={{ backgroundColor: "#fef3c7", color: "#d97706", padding: "0.5rem", borderRadius: "8px", fontSize: "1.1rem" }}>🕒</span>
              <span style={{ fontSize: "1.75rem", fontWeight: "800" }}>2</span>
            </div>
            <h3 style={{ fontSize: "1rem", fontWeight: "700", margin: "0 0 0.2rem 0" }}>Pendientes</h3>
            <span style={{ fontSize: "0.8rem", color: "#94a3b8" }}>En revisión</span>
          </div>

          <div style={{ backgroundColor: "white", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "1.25rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <span style={{ backgroundColor: "#dcfce7", color: "#16a34a", padding: "0.5rem", borderRadius: "8px", fontSize: "1.1rem" }}>✓</span>
              <span style={{ fontSize: "1.75rem", fontWeight: "800" }}>0</span>
            </div>
            <h3 style={{ fontSize: "1rem", fontWeight: "700", margin: "0 0 0.2rem 0" }}>Aprobadas</h3>
            <span style={{ fontSize: "0.8rem", color: "#94a3b8" }}>Cambios aplicados</span>
          </div>

          <div style={{ backgroundColor: "white", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "1.25rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <span style={{ backgroundColor: "#fee2e2", color: "#dc2626", padding: "0.5rem", borderRadius: "8px", fontSize: "1.1rem" }}>✕</span>
              <span style={{ fontSize: "1.75rem", fontWeight: "800" }}>1</span>
            </div>
            <h3 style={{ fontSize: "1rem", fontWeight: "700", margin: "0 0 0.2rem 0" }}>Rechazadas</h3>
            <span style={{ fontSize: "0.8rem", color: "#94a3b8" }}>No aprobadas</span>
          </div>
        </div>
      </main>

      {/* MODAL DE SUBIDA */}
      {modalSubida && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(15, 23, 42, 0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ position: "relative", backgroundColor: "white", borderRadius: "12px", padding: "1.5rem", maxWidth: "520px", width: "90%" }}>
            <button 
              onClick={() => setModalSubida(false)}
              style={{ position: "absolute", top: "12px", right: "16px", background: "none", border: "none", fontSize: "1.25rem", cursor: "pointer", color: "#64748b" }}
            >
              ✕
            </button>
            <SubirPlanoForm />
          </div>
        </div>
      )}

    </div>
  );
}
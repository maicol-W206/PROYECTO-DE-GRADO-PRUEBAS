import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

interface LoginProps {
  tipoPanel?: "admin" | "asesor";
  onLoginExitoso?: (usuario: string, rol: string) => void;
}

export default function Login({ tipoPanel = "admin", onLoginExitoso }: LoginProps) {
  const [esAsesor, setEsAsesor] = useState(tipoPanel === "asesor");
  const [usuarioInput, setUsuarioInput] = useState("");
  const [password, setPassword] = useState("");
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario: usuarioInput, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("sesion_usuario", data.usuario.nombreUsuario);
        localStorage.setItem("rol_usuario", data.usuario.rol);
        
        if (onLoginExitoso) {
          onLoginExitoso(data.usuario.nombreUsuario, data.usuario.rol);
        }

        if (data.usuario.rol === "asesor" || esAsesor) {
          navigate("/asesor");
        } else {
          navigate("/admin");
        }
      } else {
        setError(data.error || "Usuario o contraseña incorrectos.");
      }
    } catch (err) {
      console.error(err);
      setError("No se pudo conectar con el servidor.");
    }
  };

  return (
    <div className={`login-container ${esAsesor ? "asesor" : "admin"}`}>
      
      {/* LOGO Y ENCABEZADO */}
      <div className="login-header">
        <div className="login-logo-box">
          <span className="login-logo-icon">⚙️</span>
        </div>
        <h1 className="login-title">Metal Mecanica El Imperio</h1>
        <p className="login-subtitle">
          {esAsesor ? "🟢 Panel de Asesor" : "🔵 Panel de Administración"}
        </p>
      </div>

      {/* TARJETA BLANCA DE FORMULARIO */}
      <div className="login-card">
        <h2 className="login-card-title">Iniciar Sesión</h2>

        <form onSubmit={handleSubmit} className="login-form">
          {/* USUARIO */}
          <div className="form-group">
            <label className="form-label">Usuario</label>
            <input
              type="text"
              placeholder="Ingresa tu usuario"
              value={usuarioInput}
              onChange={(e) => setUsuarioInput(e.target.value)}
              className="form-input"
              required
            />
          </div>

          {/* CONTRASEÑA */}
          <div className="form-group">
            <label className="form-label">Contraseña</label>
            <div className="password-input-wrapper">
              <input
                type={mostrarPassword ? "text" : "password"}
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input-password"
                required
              />
              <button
                type="button"
                onClick={() => setMostrarPassword(!mostrarPassword)}
                className="toggle-password-btn"
              >
                {mostrarPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* MENSAJE DE ERROR */}
          {error && <div className="login-error-msg">{error}</div>}

          {/* BOTÓN SUBMIT */}
          <button type="submit" className="login-submit-btn">
            Acceder
          </button>
        </form>

        {/* ENLACES INFERIORES */}
        <div className="login-footer-links">
          <button
            onClick={() => setEsAsesor(!esAsesor)}
            className="switch-role-btn"
          >
            {esAsesor ? "¿Eres administrador? " : "¿Eres asesor? "}
            <span>Accede aquí</span>
          </button>

          <Link to="/" className="back-home-link">
            ← Volver al sitio
          </Link>
        </div>
      </div>
    </div>
  );
}
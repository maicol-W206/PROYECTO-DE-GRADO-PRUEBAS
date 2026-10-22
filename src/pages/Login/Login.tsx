import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

export interface LoginProps {
  tipoPanel?: 'admin' | 'asesor';
  onLoginExitoso?: (usuario: string, rol?: string) => void;
}

export const Login: React.FC<LoginProps> = ({ tipoPanel, onLoginExitoso }) => {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  // Evalúa si es vista de asesor por prop directa o por la URL actual
  const esAsesor = tipoPanel === 'asesor' || (location?.pathname ? location.pathname.includes('/asesor') : false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('usuario', JSON.stringify(data.usuario));

        const nombreUsr = data.usuario?.nombre || data.usuario?.nombreUsuario || usuario;
        const rolUsr = data.usuario?.rol || (esAsesor ? 'asesor' : 'admin');

        // Ejecuta el callback que actualiza el estado en Admin.tsx / Asesor.tsx
        if (onLoginExitoso) {
          onLoginExitoso(nombreUsr, rolUsr);
        } else {
          if (esAsesor) {
            navigate('/asesor-dashboard');
          } else {
            navigate('/admin-dashboard');
          }
        }
      } else {
        setError(data.error || 'Credenciales incorrectas');
      }
    } catch (err) {
      console.error('Error de red:', err);
      setError('No se pudo conectar con el servidor.');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#0f172a',
      color: '#ffffff',
      fontFamily: 'sans-serif'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <div style={{ fontSize: '40px', marginBottom: '10px' }}>⚙️</div>
        <h2 style={{ fontSize: '24px', margin: '0 0 5px 0' }}>Metal Mecanica El Imperio</h2>
        <p style={{ color: '#38bdf8', fontSize: '14px', margin: 0 }}>
          {esAsesor ? '● Panel de Asesores' : '● Panel de Administración'}
        </p>
      </div>

      <div style={{
        backgroundColor: '#ffffff',
        color: '#0f172a',
        padding: '30px',
        borderRadius: '12px',
        width: '100%',
        maxWidth: '380px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.3)'
      }}>
        <h3 style={{ margin: '0 0 20px 0', textAlign: 'center', fontSize: '20px' }}>
          Iniciar Sesión
        </h3>

        {error && (
          <div style={{
            backgroundColor: '#fef2f2',
            color: '#dc2626',
            padding: '10px',
            borderRadius: '6px',
            fontSize: '13px',
            marginBottom: '15px',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '5px' }}>
              Usuario
            </label>
            <input
              type="text"
              placeholder="Ingresa tu usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid #cbd5e1',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '5px' }}>
              Contraseña
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '6px',
                  border: '1px solid #cbd5e1',
                  boxSizing: 'border-box'
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              backgroundColor: '#2563eb',
              color: '#ffffff',
              padding: '12px',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Acceder
          </button>
        </form>

        <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '13px' }}>
          {esAsesor ? (
            <p style={{ margin: '5px 0' }}>
              ¿Eres administrador?{' '}
              <Link to="/admin" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 'bold' }}>
                Accede aquí
              </Link>
            </p>
          ) : (
            <p style={{ margin: '5px 0' }}>
              ¿Eres asesor?{' '}
              <Link to="/asesor" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 'bold' }}>
                Accede aquí
              </Link>
            </p>
          )}

          <div style={{ marginTop: '10px' }}>
            <Link to="/" style={{ color: '#64748b', textDecoration: 'none' }}>
              ← Volver al sitio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
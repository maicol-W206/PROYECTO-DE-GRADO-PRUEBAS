import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";

export type HeaderType = {
  className?: string;
};

const Header: FunctionComponent<HeaderType> = ({ className = "" }) => {
  const navigate = useNavigate();

  // Función para volver al inicio
  const onGoHomeClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  // Función para ir al catálogo
  const onGoCatalogoClick = useCallback(() => {
    navigate("/catalogop");
  }, [navigate]);

  return (
    <header className={[styles.header, className].join(" ")}>
      <div className={styles.container}>
        <div className={styles.link}>
          {/* Este div actúa como escudo para el Logo y Nombre */}
          <div 
            onClick={onGoHomeClick} 
            style={{ 
              cursor: 'pointer', 
              zIndex: 99999, 
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}
          >
            <img 
              className={styles.containerIcon} 
              alt="Inicio" 
              src="/Container11.svg" 
            />
            <div className={styles.container2}>
              <div className={styles.heading1}>
                <h3 className={styles.metalMecnicaEl}>
                  Metal Mecanica El Imperio
                </h3>
              </div>
              <div className={styles.paragraph}>
                <div className={styles.solucionesB2b}>Soluciones B2B</div>
              </div>
            </div>
          </div>
        </div>

        <nav className={styles.navigation}>
          {/* BOTÓN INICIO */}
          <div 
            className={styles.link2} 
            onClick={onGoHomeClick}
            style={{ cursor: 'pointer', zIndex: 99999, position: 'relative' }}
          >
            <div className={styles.inicio}>Inicio</div>
          </div>

          {/* BOTÓN ENCONTRAR PIEZA (CATÁLOGO) */}
          <div 
            className={styles.link3} 
            onClick={onGoCatalogoClick}
            style={{ cursor: 'pointer', zIndex: 99999, position: 'relative' }}
          >
            <div className={styles.encontrarPieza}>Encontrar Pieza</div>
          </div>

          <div className={styles.link4}>
            <div className={styles.catlogo}>Catálogo</div>
          </div>

          <button className={styles.link5}>
            <div className={styles.acceder}>Acceder</div>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
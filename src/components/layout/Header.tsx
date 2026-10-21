import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

export default function Header() {
  const [showLoginMenu, setShowLoginMenu] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoTitle}>Metal Mecanica El Imperio</span>
          <span className={styles.logoSub}>Soluciones B2B</span>
        </Link>

        <nav className={styles.nav}>
          <Link to="/" className={styles.navLink}>Inicio</Link>
          <Link to="/encontrar-pieza" className={styles.navLink}>Encontrar Pieza</Link>
          <Link to="/catalogo" className={styles.navLink}>Catálogo</Link>

          {/* MENÚ DESPLEGABLE DE ACCESOS */}
          <div className={styles.dropdownContainer}>
            <button 
              type="button"
              className={styles.btnAcceder}
              onClick={() => setShowLoginMenu(!showLoginMenu)}
            >
              Acceder ▾
            </button>

            {showLoginMenu && (
              <div className={styles.dropdownMenu}>
                <Link 
                  to="/asesor" 
                  className={styles.dropdownItem}
                  onClick={() => setShowLoginMenu(false)}
                >
                  🧑‍💼 Portal Asesor
                </Link>
                <Link 
                  to="/admin" 
                  className={styles.dropdownItem}
                  onClick={() => setShowLoginMenu(false)}
                >
                  ⚙️ Portal Administrador
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
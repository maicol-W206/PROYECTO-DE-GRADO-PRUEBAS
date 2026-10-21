import { Link } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import styles from "./B2BConstructionPartsApp.module.css";

const B2BConstructionPartsApp = () => {
  return (
    <div className={styles.appContainer}>
      <Header />

      <main className={styles.mainContent}>
        {/* HERO SECTION / BANNER PRINCIPAL */}
        <section className={styles.hero}>
          <div className={styles.heroContainer}>
            <span className={styles.badge}>Soluciones Metalmecánicas B2B</span>
            <h1 className={styles.title}>
              Fabricación y Suministro de Piezas Industriales de Alta Calidad
            </h1>
            <p className={styles.subtitle}>
              Encuentra planos técnicos en DXF y fichas en PDF para bisagras, bujes, soportes y componentes de precisión.
            </p>
            <div className={styles.heroActions}>
              <Link to="/encontrar-pieza" className={styles.btnPrimary}>
                🔍 Buscar Pieza Técnica
              </Link>
              <Link to="/catalogo" className={styles.btnSecondary}>
                📦 Ver Catálogo Completo
              </Link>
            </div>
          </div>
        </section>

        {/* ACCESOS DIRECTOS A CATEGORÍAS */}
        <section className={styles.categories}>
          <h2 className={styles.sectionTitle}>Nuestras Categorías Principales</h2>
          <div className={styles.grid}>
            <Link to="/catalogo" className={styles.card}>
              <div className={styles.cardIcon}>⚙️</div>
              <h3>Bisagras Industriales</h3>
              <p>Mecanizadas, de tres elementos y para cofres pesados.</p>
            </Link>

            <Link to="/catalogo" className={styles.card}>
              <div className={styles.cardIcon}>🔩</div>
              <h3>Bujes de Precisión</h3>
              <p>Bujes en bronce, nylon, acero inoxidable y aislantes.</p>
            </Link>

            <Link to="/catalogo" className={styles.card}>
              <div className={styles.cardIcon}>🏗️</div>
              <h3>Soportes y Orejas de Izaje</h3>
              <p>Diseñados para tableros eléctricos, cofres y cargas pesadas.</p>
            </Link>

            <Link to="/catalogo" className={styles.card}>
              <div className={styles.cardIcon}>📄</div>
              <h3>Fichas Técnicas & DXF</h3>
              <p>Descarga directa de archivos CAD para corte y manufactura.</p>
            </Link>
          </div>
        </section>

        {/* POR QUÉ ELEGIRNOS / VENTAJAS */}
        <section className={styles.features}>
          <div className={styles.featureItem}>
            <h3>📐 Planos CAD Directos</h3>
            <p>Acceso inmediato a archivos .DXF y .PDF para producción.</p>
          </div>
          <div className={styles.featureItem}>
            <h3>🛡️ Estándares Industriales</h3>
            <p>Materiales homologados en Acero Inoxidable 316, Bronce y Nylon.</p>
          </div>
          <div className={styles.featureItem}>
            <h3>🏢 Atención B2B</h3>
            <p>Módulo especializado para asesores y administradores de proyectos.</p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default B2BConstructionPartsApp;
import { useState } from "react";
import { Link } from "react-router-dom";
import SubirPlanoForm from "../../components/forms/SubirPlanoForm";
import styles from "./AsesorDashboard.module.css";

export default function AsesorDashboard() {
  const [modalAbierto, setModalAbierto] = useState(false);

  return (
    <div className={styles.pageBackground}>
      {/* HEADER DE LA APPLICACIÓN */}
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <div className={styles.logoGroup}>
            <div className={styles.logoIcon}>⚙️</div>
            <div>
              <h1 className={styles.logoTitle}>metal mecánica el imperio</h1>
              <span className={styles.logoSub}>Soluciones B2B</span>
            </div>
          </div>
          <div className={styles.navLinks}>
            <Link to="/" className={styles.linkVolver}>volver a sitio</Link>
            <Link to="/asesor" className={styles.btnAcceder}>Acceder</Link>
          </div>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className={styles.container}>
        {/* ENCABEZADO CON BOTÓN NUEVA SOLICITUD */}
        <div className={styles.topRow}>
          <div>
            <h2 className={styles.pageTitle}>Panel de Asesor</h2>
            <p className={styles.pageSub}>Gestiona tus solicitudes de cambios</p>
          </div>
          <button 
            className={styles.btnNuevaSolicitud} 
            onClick={() => setModalAbierto(true)}
          >
            + Nueva Solicitud
          </button>
        </div>

        {/* METRICAS SUPERIORES (TARJETAS DE RESUMEN) */}
        <div className={styles.metricsGrid}>
          <div className={styles.metricCard}>
            <div className={styles.metricHeader}>
              <span className={`${styles.iconBadge} ${styles.blueIcon}`}>📄</span>
              <span className={styles.metricNum}>3</span>
            </div>
            <h3 className={styles.metricLabel}>Total Solicitudes</h3>
            <span className={styles.metricSub}>Todas las solicitudes</span>
          </div>

          <div className={styles.metricCard}>
            <div className={styles.metricHeader}>
              <span className={`${styles.iconBadge} ${styles.yellowIcon}`}>🕒</span>
              <span className={styles.metricNum}>2</span>
            </div>
            <h3 className={styles.metricLabel}>Pendientes</h3>
            <span className={styles.metricSub}>En revisión</span>
          </div>

          <div className={styles.metricCard}>
            <div className={styles.metricHeader}>
              <span className={`${styles.iconBadge} ${styles.greenIcon}`}>✓</span>
              <span className={styles.metricNum}>0</span>
            </div>
            <h3 className={styles.metricLabel}>Aprobadas</h3>
            <span className={styles.metricSub}>Cambios aplicados</span>
          </div>

          <div className={styles.metricCard}>
            <div className={styles.metricHeader}>
              <span className={`${styles.iconBadge} ${styles.redIcon}`}>✕</span>
              <span className={styles.metricNum}>1</span>
            </div>
            <h3 className={styles.metricLabel}>Rechazadas</h3>
            <span className={styles.metricSub}>No aprobadas</span>
          </div>
        </div>

        {/* TRES COLUMNAS DE ESTADO */}
        <div className={styles.columnsGrid}>
          {/* COLUMNA PENDIENTES */}
          <div className={styles.columnCard}>
            <div className={styles.columnHeader}>
              <span className={`${styles.miniBadge} ${styles.yellowIcon}`}>🕒</span>
              <div>
                <h4>Pendientes</h4>
                <p>2 solicitudes</p>
              </div>
            </div>

            <div className={styles.cardsList}>
              <div className={styles.itemCard}>
                <div className={styles.itemHeader}>
                  <span className={styles.itemEditIcon}>📝</span>
                  <div>
                    <h5>Actualizar precio buje BUJ-002</h5>
                    <p>Actualización de precio por cambio en coste de materias primas.</p>
                  </div>
                </div>
                <div className={styles.itemFooter}>
                  <span className={styles.reqTag}>REQ-002</span>
                  <span className={styles.itemDate}>2026-03-19</span>
                </div>
              </div>

              <div className={styles.itemCard}>
                <div className={styles.itemHeader}>
                  <span className={styles.itemEditIcon}>📝</span>
                  <div>
                    <h5>Modificar especificaciones LEN-005</h5>
                    <p>Corregir rango de temperatura en especificaciones técnicas.</p>
                  </div>
                </div>
                <div className={styles.itemFooter}>
                  <span className={styles.reqTag}>REQ-006</span>
                  <span className={styles.itemDate}>2026-03-15</span>
                </div>
              </div>
            </div>
          </div>

          {/* COLUMNA APROBADAS */}
          <div className={styles.columnCard}>
            <div className={styles.columnHeader}>
              <span className={`${styles.miniBadge} ${styles.greenIcon}`}>✓</span>
              <div>
                <h4>Aprobadas</h4>
                <p>0 solicitudes</p>
              </div>
            </div>
            <div className={styles.emptyState}>No hay solicitudes aprobadas</div>
          </div>

          {/* COLUMNA RECHAZADAS */}
          <div className={styles.columnCard}>
            <div className={styles.columnHeader}>
              <span className={`${styles.miniBadge} ${styles.redIcon}`}>✕</span>
              <div>
                <h4>Rechazadas</h4>
                <p>1 solicitudes</p>
              </div>
            </div>

            <div className={styles.cardsList}>
              <div className={styles.itemCard}>
                <div className={styles.itemHeader}>
                  <span className={styles.itemDeleteIcon}>🗑️</span>
                  <div>
                    <h5>Eliminar soporte SOP-015 descontinua...</h5>
                    <p>El fabricante ha descontinuado este modelo y no hay reemplazos directos.</p>
                  </div>
                </div>
                <div className={styles.itemFooter}>
                  <span className={styles.reqTag}>REQ-004</span>
                  <span className={styles.itemDate}>2026-03-17</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* MODAL PARA SUBIR PLANOS A MYSQL AL DAR CLIC EN "+ NUEVA SOLICITUD" */}
      {modalAbierto && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button className={styles.btnCloseModal} onClick={() => setModalAbierto(false)}>✕</button>
            <SubirPlanoForm />
          </div>
        </div>
      )}
    </div>
  );
}
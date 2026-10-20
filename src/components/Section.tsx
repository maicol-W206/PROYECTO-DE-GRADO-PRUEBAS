import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Container from "./Container"; 
import styles from "./Section.module.css";

export type SectionType = {
  className?: string;
};

const Section: FunctionComponent<SectionType> = ({ className = "" }) => {
  const navigate = useNavigate();

  // Función para el botón azul (Encontrar Pieza)
  const onEncontrarPiezaClick = useCallback(() => {
    // Forzamos la navegación a la ruta base de búsqueda guiada
    // El 'replace: true' soluciona el problema de los dos clics
    navigate("/encontrar-pieza", { replace: true }); 
  }, [navigate]);

  // Función para el botón gris (Ver Catálogo)
  const onVerCatalogoClick = useCallback(() => {
    // Navegamos directamente al catálogo
    navigate("/catalogo", { replace: true });
  }, [navigate]);

  return (
    <div className={[styles.section, className].join(" ")}>
      <div className={styles.container}>
        <section className={styles.containerWrapper}>
          <div className={styles.container2}>
            <div className={styles.containerParent}>
              <div className={styles.container3}>
                <div className={styles.solucionesB2b}>
                  Soluciones B2B · Calidad Industrial
                </div>
              </div>
              <div className={styles.heading1}>
                <h1 className={styles.componentesIndustrialesDe}>
                  Componentes Industriales de Precisión
                </h1>
              </div>
              <div className={styles.paragraph}>
                <div className={styles.proveedorEspecializadoEn}>
                  Proveedor especializado en piezas electrónicas e industriales
                  para empresas. Encuentra exactamente lo que necesitas con
                  nuestro sistema de búsqueda inteligente.
                </div>
              </div>
            </div>

            {/* BOTONES PRINCIPALES */}
            <div className={styles.container4}>
              {/* BOTÓN AZUL: ENCONTRAR PIEZA */}
              <button className={styles.link} onClick={onEncontrarPiezaClick}>
                <div className={styles.iconWrapper}>
                  <img className={styles.icon} alt="" src="/Icon5.svg" />
                </div>
                <div className={styles.encontrarPieza}>Encontrar Pieza</div>
              </button>
              
              {/* BOTÓN GRIS: VER CATÁLOGO */}
              <button className={styles.link2} onClick={onVerCatalogoClick}>
                <div className={styles.verCatlogo}>Ver Catálogo</div>
              </button>
            </div>
          </div>
        </section>

        {/* SECCIÓN DE CERTIFICACIONES E INFO */}
        <section className={styles.container5}>
          <div className={styles.container6}>
            <Container
              icon="/Icon7.svg"
              isoReference="5000+"
              productos="Productos"
            />
            <Container
              icon="/Icon2.svg"
              isoReference="24h"
              isoReferenceWidth="58px"
              productos="Entrega rápida"
            />
            <Container
              icon="/Icon1.svg"
              isoReference="ISO 9001"
              isoReferenceWidth="135px"
              productos="Certificado"
            />
            <Container
              icon="/Icon.svg"
              isoReference="100%"
              isoReferenceWidth="84px"
              productos="Garantía"
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Section;
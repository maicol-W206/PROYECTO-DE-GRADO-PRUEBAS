import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Section3.module.css";

export type Section3Type = {
  className?: string;
};

const Section3: FunctionComponent<Section3Type> = ({ className = "" }) => {
  const navigate = useNavigate();
  
  const onLinkClick = useCallback(() => {
    navigate("/encontrar-pieza", { replace: true });
  }, [navigate]);

  return (
    <div className={[styles.section, className].join(" ")}>
      <div className={styles.container}>
        <div className={styles.assistantPanel}>
          <div className={styles.heading2}>
            <h1 className={styles.listoParaEncontrar}>
              ¿Listo para encontrar tu pieza perfecta?
            </h1>
          </div>
          <div className={styles.paragraph}>
            <div className={styles.nuestroAsistenteInteligente}>
              Nuestro asistente inteligente te guiará paso a paso
            </div>
          </div>
        </div>
        <div className={styles.assistantAction}>
          <button className={styles.link} onClick={onLinkClick}>
            <div className={styles.iconWrapper}>
              <img className={styles.icon} alt="" src="/Icon6.svg" />
            </div>
            <b className={styles.comenzarBsqueda}>Comenzar Búsqueda</b>
            <div className={styles.iconWrapper}>
              <img className={styles.icon} alt="" src="/Icon4.svg" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Section3;

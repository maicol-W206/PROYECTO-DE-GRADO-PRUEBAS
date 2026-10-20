import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./HeaderEncontrarpieza.module.css";

export type HeaderType = {
  className?: string;
};

const HeaderEncontrarpieza: FunctionComponent<HeaderType> = ({ className = "" }) => {
  const navigate = useNavigate();

  const onLinkContainerClick = useCallback(() => {
    navigate("/", { replace: true });
  }, [navigate]);

  const onLinkContainerClick1 = useCallback(() => {
    navigate("/encontrar-pieza", { replace: true });
  }, [navigate]);

  const onCatlogoTextClick = useCallback(() => {
    navigate("/catalogo", { replace: true });
  }, [navigate]);

  const onLinkClick = useCallback(() => {
    navigate("/admin", { replace: true });
  }, [navigate]);

  return (
    <header className={[styles.headerEncontrarpieza, className].join(" ")}>
      <div className={styles.container}>
        <div className={styles.link}>
          <img className={styles.containerIcon} alt="" src="/Container1.svg" />
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
        <nav className={styles.navigation}>
          <div className={styles.link2} onClick={onLinkContainerClick}>
            <div className={styles.inicio}>Inicio</div>
          </div>
          <div className={styles.link3} onClick={onLinkContainerClick1}>
            <div className={styles.encontrarPieza}>Encontrar Pieza</div>
          </div>
          <div className={styles.link4} onClick={onCatlogoTextClick}>
            <div className={styles.catlogo}>
              Catálogo
            </div>
          </div>
          <button className={styles.link5} onClick={onLinkClick}>
            <div className={styles.acceder}>Acceder</div>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default HeaderEncontrarpieza;

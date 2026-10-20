import {FunctionComponent,useMemo,type CSSProperties,useCallback,} from "react";
import styles from "./Container1.module.css";

export type Container1Type = {
  className?: string;
  container?: string;
  bsquedaInteligente?: string;
  sistemaGuiadoPasoAPasoQueTe?: string;
  probarAhora?: string;

  /** Style props */
  linkGap?: CSSProperties["gap"];
  probarAhoraWidth?: CSSProperties["width"];
  iconMarginLeft?: CSSProperties["marginLeft"];

  /** Action props */
  onLinkClick?: () => void;
};

const Container1: FunctionComponent<Container1Type> = ({
  className = "",
  container,
  bsquedaInteligente,
  sistemaGuiadoPasoAPasoQueTe,
  linkGap,
  probarAhora,
  onLinkClick,
  probarAhoraWidth,
  iconMarginLeft,
}) => {
  const linkStyle: CSSProperties = useMemo(() => {
    return {
      gap: linkGap,
    };
  }, [linkGap]);

  const probarAhoraStyle: CSSProperties = useMemo(() => {
    return {
      width: probarAhoraWidth,
    };
  }, [probarAhoraWidth]);

  const iconStyle: CSSProperties = useMemo(() => {
    return {
      marginLeft: iconMarginLeft,
    };
  }, [iconMarginLeft]);

  const onProbarAhoraClick = useCallback(() => {
    // Please sync "Frame 1" to the project
  }, []);

  return (
    <div className={[styles.container, className].join(" ")}>
      <img
        className={styles.containerIcon}
        loading="lazy"
        alt=""
        src={container}
      />
      <div className={styles.frameParent}>
        <div className={styles.heading3Parent}>
          <div className={styles.heading3}>
            <h3 className={styles.bsquedaInteligente}>{bsquedaInteligente}</h3>
          </div>
          <div className={styles.paragraph}>
            <div className={styles.sistemaGuiadoPaso}>
              {sistemaGuiadoPasoAPasoQueTe}
            </div>
          </div>
        </div>
        <button className={styles.link} style={linkStyle}>
          <div
            className={styles.probarAhora}
            onClick={onLinkClick}
            style={probarAhoraStyle}
          >
            {probarAhora}
          </div>
          <img
            className={styles.icon}
            alt=""
            src="/Icon3.svg"
            style={iconStyle}
          />
        </button>
      </div>
    </div>
  );
};

export default Container1;

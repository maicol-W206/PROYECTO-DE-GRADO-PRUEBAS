import {
  FunctionComponent,
  useMemo,
  type CSSProperties,
  useCallback,
} from "react";
import styles from "./Linkcatalogoproductos.module.css";

export type LinkType = {
  className?: string;
  container?: string;
  bIS001?: string;
  stock245?: string;
  bisagraInoxidableFijaPremium?: string;
  bisagraDeAceroInoxidableCon?: string;
  aceroInoxidable304?: string;
  x75X3mm?: string;

  /** Style props */
  linkWidth?: CSSProperties["width"];
  containerPadding?: CSSProperties["padding"];
  textWidth?: CSSProperties["width"];
  textPadding?: CSSProperties["padding"];
  textWidth1?: CSSProperties["width"];
  textBackgroundColor?: CSSProperties["backgroundColor"];
  stock245Color?: CSSProperties["color"];
  bisagraInoxidableFijaWidth?: CSSProperties["width"];
  paragraphPadding?: CSSProperties["padding"];
  bisagraDeAceroHeight?: CSSProperties["height"];
  textWidth2?: CSSProperties["width"];
  textWidth3?: CSSProperties["width"];

  /** Action props */
  onContainerClick?: () => void;
};

const Linkcatalogoproductos: FunctionComponent<LinkType> = ({
  className = "",
  linkWidth,
  container,
  containerPadding,
  textWidth,
  bIS001,
  textPadding,
  textWidth1,
  textBackgroundColor,
  stock245,
  stock245Color,
  bisagraInoxidableFijaPremium,
  bisagraInoxidableFijaWidth,
  paragraphPadding,
  bisagraDeAceroInoxidableCon,
  bisagraDeAceroHeight,
  textWidth2,
  aceroInoxidable304,
  textWidth3,
  x75X3mm,
  onContainerClick,
}) => {
  const linkStyle: CSSProperties = useMemo(() => {
    return {
      width: linkWidth,
    };
  }, [linkWidth]);

  const containerStyle: CSSProperties = useMemo(() => {
    return {
      padding: containerPadding,
    };
  }, [containerPadding]);

  const textStyle: CSSProperties = useMemo(() => {
    return {
      width: textWidth,
    };
  }, [textWidth]);

  const text1Style: CSSProperties = useMemo(() => {
    return {
      padding: textPadding,
      width: textWidth1,
      backgroundColor: textBackgroundColor,
    };
  }, [textPadding, textWidth1, textBackgroundColor]);

  const stock245Style: CSSProperties = useMemo(() => {
    return {
      color: stock245Color,
    };
  }, [stock245Color]);

  const bisagraInoxidableFijaStyle: CSSProperties = useMemo(() => {
    return {
      width: bisagraInoxidableFijaWidth,
    };
  }, [bisagraInoxidableFijaWidth]);

  const paragraphStyle: CSSProperties = useMemo(() => {
    return {
      padding: paragraphPadding,
    };
  }, [paragraphPadding]);

  const bisagraDeAceroStyle: CSSProperties = useMemo(() => {
    return {
      height: bisagraDeAceroHeight,
    };
  }, [bisagraDeAceroHeight]);

  const text2Style: CSSProperties = useMemo(() => {
    return {
      width: textWidth2,
    };
  }, [textWidth2]);

  const text3Style: CSSProperties = useMemo(() => {
    return {
      width: textWidth3,
    };
  }, [textWidth3]);

  const onContainerClick1 = useCallback(() => {
    // Please sync "Frame 4" to the project
  }, []);

  return (
    <section className={[styles.link, className].join(" ")} style={linkStyle}>
      <img
        className={styles.containerIcon}
        loading="lazy"
        alt=""
        src={container}
      />
      <div className={styles.container} style={containerStyle}>
        <div className={styles.containerParent}>
          <div className={styles.container2}>
            <div className={styles.text} style={textStyle}>
              <div className={styles.bis001}>{bIS001}</div>
            </div>
            <div className={styles.text2} style={text1Style}>
              <div className={styles.stock245} style={stock245Style}>
                {stock245}
              </div>
            </div>
          </div>
          <div className={styles.heading3}>
            <b
              className={styles.bisagraInoxidableFija}
              style={bisagraInoxidableFijaStyle}
            >
              {bisagraInoxidableFijaPremium}
            </b>
          </div>
          <div className={styles.paragraph} style={paragraphStyle}>
            <div className={styles.bisagraDeAcero} style={bisagraDeAceroStyle}>
              {bisagraDeAceroInoxidableCon}
            </div>
          </div>
        </div>
        <div className={styles.container3}>
          <div className={styles.container4}>
            <div className={styles.text3}>
              <div className={styles.material}>Material:</div>
            </div>
            <div className={styles.text4} style={text2Style}>
              <div className={styles.x75X}>{aceroInoxidable304}</div>
            </div>
          </div>
          <div className={styles.container4}>
            <div className={styles.text5}>
              <div className={styles.material}>Dimensiones:</div>
            </div>
            <div className={styles.text6} style={text3Style}>
              <div className={styles.x75X}>{x75X3mm}</div>
            </div>
          </div>
        </div>
        <div className={styles.container6} onClick={onContainerClick}>
          <div className={styles.container7}>
            <h3 className={styles.consultar}>Consultar</h3>
          </div>
          <button className={styles.container8}>
            <div className={styles.verDetalles}>Ver detalles</div>
            <img className={styles.icon} alt="" src="/Icon12.svg" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Linkcatalogoproductos;

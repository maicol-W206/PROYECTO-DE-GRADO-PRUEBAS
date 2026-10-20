import {FunctionComponent,useMemo,type CSSProperties,useCallback,
} from "react";
import styles from "./Linkcatalogoproductos1.module.css";

export type Link1Type = {
  className?: string;
  lEN005?: string;
  stock420?: string;
  lengetaDeCierrePlatina?: string;
  lengetaDeCierreDeAceroInoxida?: string;
  aceroInoxidable316?: string;
  x30X5mm?: string;

  /** Style props */
  linkWidth?: CSSProperties["width"];
  containerPadding?: CSSProperties["padding"];
  textWidth?: CSSProperties["width"];
  textWidth1?: CSSProperties["width"];
  textBackgroundColor?: CSSProperties["backgroundColor"];
  textPadding?: CSSProperties["padding"];
  stock420Color?: CSSProperties["color"];
  lengetaDeCierreWidth?: CSSProperties["width"];
  paragraphPadding?: CSSProperties["padding"];
  lengetaDeCierreHeight?: CSSProperties["height"];
  textWidth2?: CSSProperties["width"];
  textWidth3?: CSSProperties["width"];

  /** Action props */
  onContainerClick4?: () => void;
};

const Linkcatalogoproductos1: FunctionComponent<Link1Type> = ({
  className = "",
  linkWidth,
  containerPadding,
  textWidth,
  lEN005,
  textWidth1,
  textBackgroundColor,
  textPadding,
  stock420,
  stock420Color,
  lengetaDeCierrePlatina,
  lengetaDeCierreWidth,
  paragraphPadding,
  lengetaDeCierreDeAceroInoxida,
  lengetaDeCierreHeight,
  textWidth2,
  aceroInoxidable316,
  textWidth3,
  x30X5mm,
  onContainerClick4,
}) => {
  const link1Style: CSSProperties = useMemo(() => {
    return {
      width: linkWidth,
    };
  }, [linkWidth]);

  const container1Style: CSSProperties = useMemo(() => {
    return {
      padding: containerPadding,
    };
  }, [containerPadding]);

  const text4Style: CSSProperties = useMemo(() => {
    return {
      width: textWidth,
    };
  }, [textWidth]);

  const text5Style: CSSProperties = useMemo(() => {
    return {
      width: textWidth1,
      backgroundColor: textBackgroundColor,
      padding: textPadding,
    };
  }, [textWidth1, textBackgroundColor, textPadding]);

  const stock420Style: CSSProperties = useMemo(() => {
    return {
      color: stock420Color,
    };
  }, [stock420Color]);

  const lengetaDeCierreStyle: CSSProperties = useMemo(() => {
    return {
      width: lengetaDeCierreWidth,
    };
  }, [lengetaDeCierreWidth]);

  const paragraph1Style: CSSProperties = useMemo(() => {
    return {
      padding: paragraphPadding,
    };
  }, [paragraphPadding]);

  const lengetaDeCierre1Style: CSSProperties = useMemo(() => {
    return {
      height: lengetaDeCierreHeight,
    };
  }, [lengetaDeCierreHeight]);

  const text6Style: CSSProperties = useMemo(() => {
    return {
      width: textWidth2,
    };
  }, [textWidth2]);

  const text7Style: CSSProperties = useMemo(() => {
    return {
      width: textWidth3,
    };
  }, [textWidth3]);

  const onContainerClick = useCallback(() => {
    // Please sync "Frame 8" to the project
  }, []);

  return (
    <section className={[styles.link, className].join(" ")} style={link1Style}>
      <div className={styles.container}>
        <div className={styles.imageLengetaDeCierrePlat} />
      </div>
      <div className={styles.container2} style={container1Style}>
        <div className={styles.containerParent}>
          <div className={styles.container3}>
            <div className={styles.text} style={text4Style}>
              <div className={styles.len005}>{lEN005}</div>
            </div>
            <div className={styles.text2} style={text5Style}>
              <div className={styles.stock420} style={stock420Style}>
                {stock420}
              </div>
            </div>
          </div>
          <div className={styles.heading3}>
            <b className={styles.lengetaDeCierre} style={lengetaDeCierreStyle}>
              {lengetaDeCierrePlatina}
            </b>
          </div>
          <div className={styles.paragraph} style={paragraph1Style}>
            <div
              className={styles.lengetaDeCierre2}
              style={lengetaDeCierre1Style}
            >
              {lengetaDeCierreDeAceroInoxida}
            </div>
          </div>
        </div>
        <div className={styles.container4}>
          <div className={styles.container5}>
            <div className={styles.text3}>
              <div className={styles.material}>Material:</div>
            </div>
            <div className={styles.text4} style={text6Style}>
              <div className={styles.x30X}>{aceroInoxidable316}</div>
            </div>
          </div>
          <div className={styles.container5}>
            <div className={styles.text5}>
              <div className={styles.material}>Dimensiones:</div>
            </div>
            <div className={styles.text6} style={text7Style}>
              <div className={styles.x30X}>{x30X5mm}</div>
            </div>
          </div>
        </div>
        <div className={styles.container7} onClick={onContainerClick4}>
          <div className={styles.container8}>
            <h3 className={styles.consultar}>Consultar</h3>
          </div>
          <button className={styles.container9}>
            <div className={styles.verDetalles}>Ver detalles</div>
            <img className={styles.icon} alt="" src="/Icon12.svg" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Linkcatalogoproductos1;

import { FunctionComponent, useMemo, type CSSProperties } from "react";
import styles from "./Container.module.css";

export type ContainerType = {
  className?: string;
  icon?: string;
  isoReference?: string;
  productos?: string;

  /** Style props */
  isoReferenceWidth?: CSSProperties["width"];
};

const Container: FunctionComponent<ContainerType> = ({
  className = "",
  icon,
  isoReference,
  isoReferenceWidth,
  productos,
}) => {
  const isoReferenceStyle: CSSProperties = useMemo(() => {
    return {
      width: isoReferenceWidth,
    };
  }, [isoReferenceWidth]);

  return (
    <div className={[styles.container, className].join(" ")}>
      <img className={styles.icon} alt="" src={icon} />
      <div className={styles.containerParent}>
        <div className={styles.container2}>
          <h2 className={styles.isoReference} style={isoReferenceStyle}>
            {isoReference}
          </h2>
        </div>
        <div className={styles.container3}>
          <div className={styles.productos}>{productos}</div>
        </div>
      </div>
    </div>
  );
};

export default Container;

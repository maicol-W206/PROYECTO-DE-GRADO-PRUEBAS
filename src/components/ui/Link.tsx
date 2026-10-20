import {
  FunctionComponent,
  useMemo,
  type CSSProperties,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Link.module.css";

export type LinkType = {
  className?: string;
  bisagras?: string;
  productos?: string;
  to?: string;

  /** Style props */
  containerBackground?: CSSProperties["background"];
  bisagrasWidth?: CSSProperties["width"];
};

const Link: FunctionComponent<LinkType> = ({
  className = "",
  containerBackground,
  bisagras,
  bisagrasWidth,
  productos,
  to,
}) => {
  const containerStyle: CSSProperties = useMemo(() => {
    return {
      background: containerBackground,
    };
  }, [containerBackground]);

  const bisagrasStyle: CSSProperties = useMemo(() => {
    return {
      width: bisagrasWidth,
    };
  }, [bisagrasWidth]);

  const navigate = useNavigate();

  const onLinkClick = useCallback(() => {
    window.scrollTo(0, 0);
    if (to) {
      navigate(to, { replace: true });
    } else {
      navigate("/catalogo", { replace: true });
    }
  }, [navigate, to]);

  return (
    <button
      className={[styles.link, className].join(" ")}
      onClick={onLinkClick}
    >
      <div className={styles.container} style={containerStyle} />
      <div className={styles.heading3Parent}>
        <div className={styles.heading3}>
          <b className={styles.bisagras} style={bisagrasStyle}>
            {bisagras}
          </b>
        </div>
        <div className={styles.paragraph}>
          <div className={styles.productos}>{productos}</div>
        </div>
      </div>
    </button>
  );
};

export default Link;

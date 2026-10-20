import { FunctionComponent } from "react";
import styles from "./ButtonEncontrarpieza.module.css";

export type ButtonType = {
  title: string;
  description: string;
  onButtonClick?: () => void;
};

const ButtonEncontrarpieza: FunctionComponent<ButtonType> = ({
  title,
  description,
  onButtonClick,
}) => {
  return (
    <button className={styles.cardButton} type="button" onClick={onButtonClick}>
      <div className={styles.cardHeader}>
        <span className={styles.cardTitle}>{title}</span>
      </div>
      <p className={styles.cardDescription}>{description}</p>
    </button>
  );
};

export default ButtonEncontrarpieza;

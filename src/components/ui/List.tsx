import { FunctionComponent } from "react";
import styles from "./List.module.css";

export type ListType = {
  className?: string;
  quinesSomos?: string;
  certificaciones?: string;
  clientes?: string;
};

const List: FunctionComponent<ListType> = ({
  className = "",
  quinesSomos,
  certificaciones,
  clientes,
}) => {
  return (
    <div className={[styles.list, className].join(" ")}>
      <div className={styles.listItem}>
        <div className={styles.quinesSomos}>{quinesSomos}</div>
      </div>
      <div className={styles.listItem}>
        <div className={styles.quinesSomos}>{certificaciones}</div>
      </div>
      <div className={styles.listItem}>
        <div className={styles.quinesSomos}>{clientes}</div>
      </div>
    </div>
  );
};

export default List;

import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ProductCard.module.css";

export type ProductCardType = {
  sku: string;
  stock: string;
  stockColor: string;
  name: string;
  description: string;
  material: string;
  dimensions: string;
  image: string;
  className?: string;
};

const ProductCard: FunctionComponent<ProductCardType> = ({
  sku,
  stock,
  stockColor,
  name,
  description,
  material,
  dimensions,
  image,
  className = "",
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/catalogo/producto/${sku}`);
  };

  return (
    <div
      className={[styles.productCard, className].join(" ")}
      onClick={handleCardClick}
    >
      <div className={styles.imageContainer}>
        <img src={image} alt={name} className={styles.productImage} />
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <span className={styles.sku}>{sku}</span>
          <span className={styles.stock} style={{ backgroundColor: stockColor }}>
            {stock}
          </span>
        </div>

        <h3 className={styles.productName}>{name}</h3>

        <p className={styles.description}>{description}</p>

        <div className={styles.specs}>
          <div className={styles.spec}>
            <span className={styles.specLabel}>Material:</span>
            <span className={styles.specValue}>{material}</span>
          </div>
          <div className={styles.spec}>
            <span className={styles.specLabel}>Dimensiones:</span>
            <span className={styles.specValue}>{dimensions}</span>
          </div>
        </div>

        <button className={styles.viewButton}>Ver detalles →</button>
      </div>
    </div>
  );
};

export default ProductCard;

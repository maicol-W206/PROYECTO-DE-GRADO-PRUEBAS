import { FunctionComponent, useState } from "react";
import Link from "./Link";
import styles from "./Section2.module.css";

export type Section2Type = {
  className?: string;
};

const Section2: FunctionComponent<Section2Type> = ({ className = "" }) => {
  const [linkItems] = useState([
    {
      containerBackground: "linear-gradient(135deg, #2b7fff, #155dfc)" as const,
      bisagras: "Bisagras",
      bisagrasWidth: "77px" as const,
      productos: "450 productos",
      to: "/catalogo/bisagras",
    },
    {
      containerBackground: "linear-gradient(135deg, #ad46ff, #9810fa)" as const,
      bisagras: "Bujes",
      bisagrasWidth: "49px" as const,
      productos: "380 productos",
      to: "/catalogo/bujes",
    },
    {
      containerBackground: "linear-gradient(135deg, #00c950, #00a63e)" as const,
      bisagras: "Soportes",
      bisagrasWidth: "81px" as const,
      productos: "320 productos",
      to: "/catalogo/soportes",
    },
    {
      containerBackground: "linear-gradient(135deg, #ff6900, #f54900)" as const,
      bisagras: "Lengüetas",
      bisagrasWidth: "94px" as const,
      productos: "280 productos",
      to: "/catalogo/lenguetas",
    },
    {
      containerBackground: "linear-gradient(135deg, #fb2c36, #e7000b)" as const,
      bisagras: "Pivotes",
      bisagrasWidth: "66px" as const,
      productos: "220 productos",
      to: "/catalogo/pivotes",
    },
    {
      containerBackground: "linear-gradient(135deg, #00b8db, #0092b8)" as const,
      bisagras: "Platinas",
      bisagrasWidth: "71px" as const,
      productos: "190 productos",
      to: "/catalogo/platinas",
    },
    {
      containerBackground: "linear-gradient(135deg, #615fff, #4f39f6)" as const,
      bisagras: "Tornillería",
      bisagrasWidth: "89px" as const,
      productos: "510 productos",
      to: "/catalogo/tornilleria",
    },
    {
      containerBackground: "linear-gradient(135deg, #f6339a, #e60076)" as const,
      bisagras: "Accesorios",
      bisagrasWidth: "100px" as const,
      productos: "340 productos",
      to: "/catalogo/accesorios",
    },
  ]);
  return (
    <div className={[styles.section, className].join(" ")}>
      <div className={styles.container}>
        <div className={styles.heading2}>
          <h2 className={styles.categorasPrincipales}>
            Categorías Principales
          </h2>
        </div>
        <div className={styles.paragraph}>
          <div className={styles.amplioCatlogoDe}>
            Amplio catálogo de componentes industriales
          </div>
        </div>
      </div>
      <section className={styles.container2}>
        {linkItems.map((item, index) => (
          <Link
            key={index}
            containerBackground={item.containerBackground}
            bisagras={item.bisagras}
            bisagrasWidth={item.bisagrasWidth}
            productos={item.productos}
            to={item.to}
          />
        ))}
      </section>
    </div>
  );
};

export default Section2;

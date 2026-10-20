import { FunctionComponent, useState, useCallback } from "react";
import Container1 from "./Container1";
import styles from "./Section1.module.css";

export type Section1Type = {
  className?: string;
};

const Section1: FunctionComponent<Section1Type> = ({ className = "" }) => {
  const [container1Items] = useState([
    {
      container: "/Container2.svg",
      bsquedaInteligente: "Búsqueda Inteligente",
      sistemaGuiadoPasoAPasoQueTe:
        "Sistema guiado paso a paso que te ayuda a encontrar la pieza exacta que necesitas",
      linkGap: "2.3px" as const,
      probarAhora: "Probar ahora ",
      probarAhoraWidth: "100px" as const,
      iconMarginLeft: undefined,
    },
    {
      container: "/Container5.svg",
      bsquedaInteligente: "Calidad Certificada",
      sistemaGuiadoPasoAPasoQueTe:
        "Todos nuestros productos cumplen con normativas internacionales ISO 9001",
      linkGap: "unset" as const,
      probarAhora: "Ver certificaciones ",
      probarAhoraWidth: "147px" as const,
      iconMarginLeft: "-7px" as const,
    },
    {
      container: "/Container.svg",
      bsquedaInteligente: "Entrega Rápida",
      sistemaGuiadoPasoAPasoQueTe:
        "Envíos en 24-48h para la mayoría de productos en stock",
      linkGap: "unset" as const,
      probarAhora: "Más información ",
      probarAhoraWidth: "130px" as const,
      iconMarginLeft: undefined,
    },
  ]);

  const onProbarAhoraClick = useCallback(() => {
    // Please sync "Frame 1" to the project
  }, []);

  return (
    <div className={[styles.section, className].join(" ")}>
      <section className={styles.container}>
        <div className={styles.heading2}>
          <h2 className={styles.porQuElegirnos}>¿Por qué elegirnos?</h2>
        </div>
        <div className={styles.paragraphWrapper}>
          <div className={styles.paragraph}>
            <div className={styles.combinamosTecnologaAvanzada}>
              Combinamos tecnología avanzada con servicio personalizado para
              ofrecerte la mejor experiencia
            </div>
          </div>
        </div>
      </section>
      <section className={styles.container2}>
        {container1Items.map((item, index) => (
          <Container1
            key={index}
            container={item.container}
            bsquedaInteligente={item.bsquedaInteligente}
            sistemaGuiadoPasoAPasoQueTe={item.sistemaGuiadoPasoAPasoQueTe}
            linkGap={item.linkGap}
            probarAhora={item.probarAhora}
            probarAhoraWidth={item.probarAhoraWidth}
            iconMarginLeft={item.iconMarginLeft}
          />
        ))}
      </section>
    </div>
  );
};

export default Section1;

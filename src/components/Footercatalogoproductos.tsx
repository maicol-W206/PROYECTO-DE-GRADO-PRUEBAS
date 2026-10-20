import { FunctionComponent } from "react";
import styles from "./Footercatalogoproductos.module.css";

export type FootercatalogoproductosType = {
  className?: string;
};


const Footercatalogoproductos: FunctionComponent<FootercatalogoproductosType> = ({ className = "" }) => {
  return (
    <footer className={[styles.footer, className].join(" ")}>
      <div className={styles.container}>
        <div className={styles.container2}>
          <div className={styles.heading3}>
            <b className={styles.metalMecnicaEl}>Metal Mecanica El Imperio</b>
          </div>
          <div className={styles.paragraph}>
            <div className={styles.proveedorLderDe}>
              Proveedor líder de componentes electrónicos e industriales para empresas.
            </div>
          </div>
        </div>

        <div className={styles.containerParent}>
          <div className={styles.container3}>
            <div className={styles.heading4}>
              <div className={styles.productos}>Productos & Fichas</div>
            </div>
            <div className={styles.list}>
              <div className={styles.listItem}>
                <a
                  href="#fichas-tecnicas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.bisagras}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Bisagras (PDF)
                </a>
              </div>
              <div className={styles.listItem}>
                <a
                  href="#fichas-tecnicas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.bisagras}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Bujes (PDF)
                </a>
              </div>
              <div className={styles.listItem}>
                <a
                  href="#fichas-tecnicas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.bisagras}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Soportes (PDF)
                </a>
              </div>
              <div className={styles.listItem}>
                <a
                  href="#fichas-tecnicas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.bisagras}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Lengüetas (PDF)
                </a>
              </div>
            </div>
          </div>

          <div className={styles.container4}>
            <div className={styles.heading4}>
              <div className={styles.empresa}>Empresa</div>
            </div>
            <div className={styles.list2}>
              <div className={styles.listItem}>
                <a href="#" className={styles.bisagras} style={{ textDecoration: "none", color: "inherit" }}>
                  Quiénes Somos
                </a>
              </div>
              <div className={styles.listItem}>
                <a href="#" className={styles.bisagras} style={{ textDecoration: "none", color: "inherit" }}>
                  Certificaciones
                </a>
              </div>
              <div className={styles.listItem}>
                <a href="#" className={styles.bisagras} style={{ textDecoration: "none", color: "inherit" }}>
                  Clientes
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.container4}>
          <div className={styles.heading4}>
            <div className={styles.contacto}>Contacto</div>
          </div>
          <div className={styles.list2}>
            <div className={styles.listItem}>
              <a href="mailto:contacto@industrialparts.com" className={styles.bisagras} style={{ textDecoration: "none", color: "inherit" }}>
                contacto@industrialparts.com
              </a>
            </div>
            <div className={styles.listItem}>
              <a href="tel:+34900123456" className={styles.bisagras} style={{ textDecoration: "none", color: "inherit" }}>
                +34 900 123 456
              </a>
            </div>
            <div className={styles.listItem}>
              <div className={styles.bisagras}>Lun-Vie: 8:00 - 18:00</div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.container6}>
        <div className={styles.bisagras}>
          © 2026 Metal Mecanica El Imperio. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footercatalogoproductos;
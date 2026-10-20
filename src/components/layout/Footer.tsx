import { FunctionComponent } from "react";
import List from "./List";
import styles from "./Footer.module.css";

export type FooterType = {
  className?: string;
};

const Footer: FunctionComponent<FooterType> = ({ className = "" }) => {
  return (
    <footer className={[styles.footer, className].join(" ")}>
      <div className={styles.container}>
        <div className={styles.container2}>
          <div className={styles.heading3}>
            <b className={styles.metalMecnicaEl}>Metal Mecanica El Imperio</b>
          </div>
          <div className={styles.paragraph}>
            <div className={styles.proveedorLderDe}>
              Proveedor líder de componentes electrónicos e industriales para
              empresas.
            </div>
          </div>
        </div>
        <div className={styles.productsCompanyPanel}>
          <div className={styles.container3}>
            <div className={styles.heading4}>
              <div className={styles.productos}>Productos</div>
            </div>
            <div className={styles.list}>
              <div className={styles.listItem}>
                <div className={styles.bisagras}>Bisagras</div>
              </div>
              <div className={styles.listItem}>
                <div className={styles.bisagras}>Bujes</div>
              </div>
              <div className={styles.listItem}>
                <div className={styles.bisagras}>Soportes</div>
              </div>
              <div className={styles.listItem}>
                <div className={styles.bisagras}>Lengüetas</div>
              </div>
            </div>
          </div>
          <div className={styles.container4}>
            <div className={styles.heading4}>
              <div className={styles.empresa}>Empresa</div>
            </div>
            <List
              quinesSomos="Quiénes Somos"
              certificaciones="Certificaciones"
              clientes="Clientes"
            />
          </div>
        </div>
        <div className={styles.container4}>
          <div className={styles.heading4}>
            <div className={styles.contacto}>Contacto</div>
          </div>
          <List
            quinesSomos="contacto@industrialparts.com"
            certificaciones="+34 900 123 456"
            clientes="Lun-Vie: 8:00 - 18:00"
          />
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

export default Footer;

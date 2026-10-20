import { FunctionComponent } from "react";
import styles from "./Section4.module.css";

export type Section4Type = {
  className?: string;
};

const Section4: FunctionComponent<Section4Type> = ({ className = "" }) => {
  return (
    <div className={[styles.section, className].join(" ")}>
      <section className={styles.container}>
        <div className={styles.heading2Parent}>
          <div className={styles.heading2}>
            <h2 className={styles.contactoRpido}>Contacto Rápido</h2>
          </div>
          <div className={styles.paragraph}>
            <div className={styles.nuestroEquipoDe}>
              Nuestro equipo de expertos está disponible para ayudarte
            </div>
          </div>
        </div>
        <div className={styles.container2}>
          <div className={styles.container3}>
            <img
              className={styles.containerIcon}
              alt=""
              src="/Container1.svg"
            />
            <div className={styles.container4}>
              <div className={styles.heading4}>
                <b className={styles.email}>Email</b>
              </div>
              <div className={styles.paragraph2}>
                <div className={styles.contactoindustrialpartscom}>
                  contacto@industrialparts.com
                </div>
              </div>
            </div>
          </div>
          <div className={styles.container3}>
            <img
              className={styles.containerIcon}
              alt=""
              src="/Container3.svg"
            />
            <div className={styles.container6}>
              <div className={styles.heading4}>
                <b className={styles.telfono}>Teléfono</b>
              </div>
              <div className={styles.paragraph2}>
                <div className={styles.phoneSpace}>+34 900 123 456</div>
              </div>
            </div>
          </div>
          <div className={styles.container3}>
            <img
              className={styles.containerIcon}
              alt=""
              src="/Container6.svg"
            />
            <div className={styles.container8}>
              <div className={styles.heading4}>
                <b className={styles.horario}>Horario</b>
              </div>
              <div className={styles.paragraph2}>
                <div className={styles.lunVie800}>Lun-Vie: 8:00 - 18:00</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.container9}>
        <div className={styles.form}>
          <div className={styles.container10}>
            <div className={styles.label}>
              <div className={styles.empresa}>Empresa</div>
            </div>
            <div className={styles.textInput}>
              <input
                className={styles.nombreDeTu}
                placeholder="Nombre de tu empresa"
                type="text"
              />
            </div>
          </div>
          <div className={styles.container10}>
            <div className={styles.label}>
              <div className={styles.empresa}>Email</div>
            </div>
            <div className={styles.textInput}>
              <input
                className={styles.tuempresacom}
                placeholder="tu@empresa.com"
                type="text"
              />
            </div>
          </div>
          <div className={styles.container12}>
            <div className={styles.label}>
              <div className={styles.empresa}>Mensaje</div>
            </div>
            <div className={styles.textArea}>
              <div className={styles.enQuPodemos}>
                ¿En qué podemos ayudarte?
              </div>
            </div>
          </div>
          <button className={styles.button}>
            <div className={styles.enviarMensaje}>Enviar Mensaje</div>
          </button>
        </div>
      </section>
    </div>
  );
};

export default Section4;

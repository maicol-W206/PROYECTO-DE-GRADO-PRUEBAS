import { FunctionComponent } from "react";
import Section from "../components/Section";
import Section1 from "../components/Section1";
import Section2 from "../components/Section2";
import Section3 from "../components/Section3";
import Section4 from "../components/Section4";
import Footer from "../components/Footer";
import Header from "../components/Headercatalogoproductos"; // <--- USA ESTE HEADER
import styles from "./B2BConstructionPartsApp.module.css";

const B2BConstructionPartsApp: FunctionComponent = () => {
  return (
    <div className={styles.b2bConstructionPartsApp}>
      <Header />
      <main className={styles.body}>
        <section className={styles.mainContent}>
          <Section />
          <Section1 />
          <Section2 />
          <Section3 />
          <Section4 />
        </section>
        <Footer />
      </main>
    </div>
  );
};

export default B2BConstructionPartsApp;
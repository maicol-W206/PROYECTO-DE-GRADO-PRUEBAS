import { FunctionComponent, useEffect } from "react";
import ContainerEncontrarpieza from "./ContainerEncontrarpieza";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import styles from "./Encontrarpieza.module.css";

const Encontrarpieza: FunctionComponent = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.Encontrarpieza}>
      <Header />
      <main className={styles.body}>
        <section className={styles.mainContent}>
          <ContainerEncontrarpieza />
        </section>
        <Footer />
      </main>
    </div>
  );
};

export default Encontrarpieza;

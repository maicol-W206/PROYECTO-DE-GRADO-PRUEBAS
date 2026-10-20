import { FunctionComponent, useEffect } from "react";
import Container from "../components/ContainerEncontrarpieza";
import Footer from "../components/FooterEncontrarpieza";
import Header from "../components/HeaderEncontrarpieza";
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
          <Container />
        </section>
        <Footer />
      </main>
    </div>
  );
};

export default Encontrarpieza;

import { FunctionComponent, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/ui/ProductCard";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import styles from "./catalogoproductos.module.css";
import CatalogoPDFs from "./CatalogoPDFs";
type Product = {
  sku: string;
  stock: string;
  stockColor: string;
  name: string;
  description: string;
  material: string;
  dimensions: string;
  image: string;
  categorySlug: string;
};

const products: Product[] = [];

const categoryLabels: Record<string, string> = {
  bisagras: "Bisagras",
  bujes: "Bujes",
  soportes: "Soportes",
  lenguetas: "Lengüetas",
  pivotes: "Pivotes",
  platinas: "Platinas",
  tornilleria: "Tornillería",
  accesorios: "Accesorios",
};

const CatalogoProductos: FunctionComponent = () => {
  const { category } = useParams<{ category?: string }>();
  const [searchTerm, setSearchTerm] = useState("");

  const displayCategory = category ? categoryLabels[category] ?? category : "Productos";
  const title = category ? `Catálogo de ${displayCategory}` : "Catálogo de Productos";
  const subtitle = category
    ? `Explora productos de ${displayCategory}`
    : "Explora nuestro catálogo completo de componentes industriales";

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory = category ? product.categorySlug === category : true;
      const matchesSearch =
        normalizedSearch === "" ||
        product.name.toLowerCase().includes(normalizedSearch) ||
        product.description.toLowerCase().includes(normalizedSearch) ||
        product.material.toLowerCase().includes(normalizedSearch) ||
        product.sku.toLowerCase().includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });
  }, [category, searchTerm]);

  return (
    <div className={styles.root}>
      <Header />
      <main className={styles.body}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <h1 className={styles.title}>{title}</h1>
              <p className={styles.subtitle}>{subtitle}</p>
            </div>
          </div>
        </section>

        <section className={styles.toolbar}>
          <div className={styles.toolbarCard}>
            <div className={styles.searchGroup}>
              <div className={styles.searchCard}>
                <img className={styles.searchIcon} alt="Buscar" src="/Icon13.svg" />
                <input
                  className={styles.searchInput}
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className={styles.filterButton} type="button">
                <img className={styles.filterIcon} alt="Filtrar" src="/Iconcatalogoproductos13.svg" />
              </button>
            </div>

            <div className={styles.viewButtons}>
              <button className={styles.toggleButton} type="button">
                <img alt="Vista de cuadrícula" src="/Button.svg" />
              </button>
              <button className={styles.toggleButton} type="button">
                <img alt="Vista de lista" src="/Button1.svg" />
              </button>
            </div>
          </div>

          <div className={styles.summary}>
            
          </div>
        </section>

        <section className={styles.grid}>
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.sku}
              sku={product.sku}
              stock={product.stock}
              stockColor={product.stockColor}
              name={product.name}
              description={product.description}
              material={product.material}
              dimensions={product.dimensions}
              image={product.image}
            />
          ))}
        </section>

        <CatalogoPDFs />
        <Footer />
      </main>
    </div>
  );
};

export default CatalogoProductos;

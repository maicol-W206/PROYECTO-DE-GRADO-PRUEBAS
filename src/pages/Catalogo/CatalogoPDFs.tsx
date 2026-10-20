import { useState } from "react";
import { usePdfs, Categoria } from "../hooks/usePdfs";
import { detectarMaterial } from "../utils/pdfUtils";
import styles from "./CatalogoPDFs.module.css";

const CATEGORIAS: { id: Categoria | "todos"; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "bisagras", label: "Bisagras" },
  { id: "bujes", label: "Bujes" },
  { id: "soportes", label: "Soportes" },
  { id: "lenguetas", label: "Lengüetas" },
  { id: "otros", label: "Otros" },
];

const ETIQUETA: Record<Categoria, string> = {
  bisagras: "Bisagra",
  bujes: "Buje",
  soportes: "Soporte",
  lenguetas: "Lengüeta",
  otros: "Otro",
};

// Separa un posible código (L43C00000002, BIS-001, 21020050) del resto del nombre
function separarCodigo(nombre: string): { codigo: string; titulo: string } {
  const m = nombre.match(/^(L43C\d+|[A-Z]{3}\s?\d{3}|\d{6,})\s+(.*)$/i);
  if (m) return { codigo: m[1].toUpperCase(), titulo: m[2] };
  return { codigo: "FICHA", titulo: nombre };
}

export default function CatalogoPDFs() {
  const docs = usePdfs();
  const [cat, setCat] = useState<Categoria | "todos">("todos");
  const [q, setQ] = useState("");

  const visibles = docs.filter(
    (d) =>
      (cat === "todos" || d.categoria === cat) &&
      d.nombre.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <section id="fichas-tecnicas" className={styles.section}>
      <h2 className={styles.titulo}>Fichas técnicas ({visibles.length})</h2>

      <input
        className={styles.buscador}
        placeholder="Buscar ficha..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />

      <div className={styles.chips}>
        {CATEGORIAS.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setCat(c.id)}
            className={`${styles.chip} ${cat === c.id ? styles.chipActivo : ""}`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {visibles.map((d) => {
          const { codigo, titulo } = separarCodigo(d.nombre);
          const material = detectarMaterial(d.archivo);
          return (
            <article key={d.archivo} className={styles.card}>
              <div className={styles.imagen}>
                <span className={styles.imagenIcono}>📄</span>
                <span className={styles.imagenTipo}>{ETIQUETA[d.categoria]}</span>
              </div>

              <div className={styles.cuerpo}>
                <div className={styles.fila}>
                  <span className={styles.codigo}>{codigo}</span>
                  <span className={styles.badge}>PDF</span>
                </div>

                <h3 className={styles.nombre}>{titulo}</h3>
                <p className={styles.descripcion}>
                  Ficha técnica en PDF. Consúltala en línea o descárgala para
                  tenerla siempre a la mano.
                </p>

                <div className={styles.datos}>
                  <div className={styles.dato}>
                    <span className={styles.datoLabel}>Tipo:</span>
                    <span className={styles.datoValor}>{ETIQUETA[d.categoria]}</span>
                  </div>
                  <div className={styles.dato}>
                    <span className={styles.datoLabel}>Material:</span>
                    <span className={styles.datoValor}>
                      {material ?? "Ver ficha"}
                    </span>
                  </div>
                </div>

                <div className={styles.acciones}>
                  <a
                    className={styles.btnVer}
                    href={d.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ver ficha →
                  </a>
                  <a className={styles.btnDescargar} href={d.url} download={d.archivo}>
                    ⬇ Descargar
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {visibles.length === 0 && (
        <p className={styles.vacio}>No hay fichas que coincidan.</p>
      )}
    </section>
  );
}

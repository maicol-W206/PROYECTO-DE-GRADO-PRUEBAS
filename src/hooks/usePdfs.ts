import { useEffect, useState } from "react";

export type Categoria = "bisagras" | "bujes" | "soportes" | "lenguetas" | "otros";

export type DocumentoPdf = {
  nombre: string;
  archivo: string;
  url: string;
  categoria: Categoria;
};

export const norm = (s: string) =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

export function categoriaDe(nombre: string): Categoria {
  const n = norm(nombre);
  if (n.includes("bisagra")) return "bisagras";
  if (n.includes("buje")) return "bujes";
  if (n.includes("soporte")) return "soportes";
  if (n.includes("lengueta") || n.includes("recibidor")) return "lenguetas";
  return "otros";
}

export function usePdfs() {
  const [docs, setDocs] = useState<DocumentoPdf[]>([]);

  useEffect(() => {
    fetch("/docs/index.json")
      .then((r) => r.json())
      .then((lista: Omit<DocumentoPdf, "categoria">[]) =>
        setDocs(lista.map((d) => ({ ...d, categoria: categoriaDe(d.archivo) })))
      )
      .catch(() => setDocs([]));
  }, []);

  return docs;
}

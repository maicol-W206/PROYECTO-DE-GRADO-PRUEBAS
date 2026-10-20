import { PIEZAS_META } from "../data/piezasMeta";

export type DocumentoPDF = {
  nombre: string;
  archivo: string;
  url: string;
};

export type Pieza = DocumentoPDF & {
  id: string;
  tipo: string;
  material?: string;
  tamano?: string;
  aplicacion?: string;
};

export const norm = (s: string) =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

export async function obtenerPDFs(): Promise<DocumentoPDF[]> {
  const respuesta = await fetch("/docs/index.json", { cache: "no-store" });
  if (!respuesta.ok) {
    throw new Error(`No se pudo leer /docs/index.json (${respuesta.status})`);
  }
  return respuesta.json();
}

export function buscarPDF(
  documentos: DocumentoPDF[],
  nombre: string,
  id?: string
): DocumentoPDF | undefined {
  const n = norm(nombre);
  const i = id ? norm(id) : "";
  return documentos.find((d) => {
    const dn = norm(d.nombre);
    return dn.includes(n) || (i !== "" && dn.includes(i));
  });
}

export function detectarTipo(nombre: string): string {
  const n = norm(nombre);
  if (n.includes("bisagra")) return "Bisagra";
  if (n.includes("buje")) return "Buje";
  if (n.includes("soporte")) return "Soporte";
  if (n.includes("lengueta") || n.includes("recibidor")) return "Lengüeta";
  return "Otro";
}

export function detectarMaterial(nombre: string): string | undefined {
  const n = norm(nombre);
  if (n.includes("inox") || /\b(304|316)\b/.test(n)) return "Acero Inoxidable";
  if (n.includes("bronce")) return "Bronce";
  if (n.includes("aluminio")) return "Aluminio";
  if (/plastico|nylon|polimero|poliamida|teflon/.test(n))
    return "Plástico / Polímero";
  return undefined;
}

export function documentoAPieza(doc: DocumentoPDF): Pieza {
  const meta = PIEZAS_META[doc.archivo] ?? {};
  return {
    ...doc,
    id: doc.archivo,
    nombre: meta.nombre ?? doc.nombre,
    tipo: meta.tipo ?? detectarTipo(doc.archivo),
    material: meta.material ?? detectarMaterial(doc.archivo),
    tamano: meta.tamano,
    aplicacion: meta.aplicacion,
  };
}

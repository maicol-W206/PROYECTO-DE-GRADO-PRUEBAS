// Completa aquí lo que no se puede deducir del nombre del archivo.
// La clave es el nombre EXACTO del PDF. Ejemplo:
// "BUJE COFRE CLARO.pdf": {
//   material: "Bronce",
//   tamano: "Pequeña (< 50mm)",
//   aplicacion: "Maquinaria Pesada",
// },
export type PiezaMeta = {
  nombre?: string;
  tipo?: string;
  material?: string;
  tamano?: string;
  aplicacion?: string;
};

export const PIEZAS_META: Record<string, PiezaMeta> = {};

import fs from "fs";
import path from "path";

const carpetaPdfs = path.resolve("public/docs");
const archivoIndice = path.join(carpetaPdfs, "index.json");

const archivos = fs
  .readdirSync(carpetaPdfs, { withFileTypes: true })
  .filter((a) => a.isFile() && /\.pdf$/i.test(a.name))
  .map((a) => a.name)
  .sort((a, b) => a.localeCompare(b, "es"));

const documentos = archivos.map((archivo) => ({
  nombre: archivo.replace(/\.pdf$/i, "").replace(/[_-]+/g, " "),
  archivo,
  url: `/docs/${encodeURIComponent(archivo)}`,
}));

fs.writeFileSync(archivoIndice, JSON.stringify(documentos, null, 2), "utf8");

console.log(`PDF encontrados: ${documentos.length}`);
console.log(`Índice creado: ${archivoIndice}`);

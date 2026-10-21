import fs from 'fs';
import path from 'path';
import pool from './db.js';

const docsDir = path.join(process.cwd(), '../public/docs');

function detectarCategoria(nombre) {
  const n = nombre.toLowerCase();
  if (n.includes('bisagra')) return 'bisagras';
  if (n.includes('buje')) return 'bujes';
  if (n.includes('soporte') || n.includes('oreja')) return 'soportes';
  if (n.includes('lengueta') || n.includes('lengüeta')) return 'lenguetas';
  return 'otros';
}

function detectarMaterial(nombre) {
  const n = nombre.toLowerCase();
  if (n.includes('inox') || n.includes('316') || n.includes('inoxidable')) return 'Acero Inoxidable 316';
  if (n.includes('nylon')) return 'Nylon';
  if (n.includes('bronce')) return 'Bronce';
  if (n.includes('zamak')) return 'Zamak';
  if (n.includes('hr')) return 'Acero HR';
  return 'No especificado';
}

function separarCodigo(nombre) {
  const m = nombre.match(/^(L43C\d+|M43C\d+|L47C[A-Z]\d+|\d{6,})\s+(.*)$/i);
  if (m) return { codigo: m[1].toUpperCase(), titulo: m[2].replace(/\.(pdf|dxf)$/i, '') };
  return { codigo: 'FICHA', titulo: nombre.replace(/\.(pdf|dxf)$/i, '') };
}

async function poblarBaseDeDatos() {
  try {
    const files = fs.readdirSync(docsDir);
    const validFiles = files.filter(f => f.endsWith('.pdf') || f.endsWith('.dxf'));

    console.log(`📦 Procesando ${validFiles.length} archivos para MySQL...`);

    for (const archivo of validFiles) {
      const { codigo, titulo } = separarCodigo(archivo);
      const categoria = detectarCategoria(archivo);
      const material = detectarMaterial(archivo);
      const ext = path.extname(archivo).substring(1).toUpperCase();
      const url = `/docs/${archivo}`;

      const query = `
        INSERT INTO piezas (codigo, nombre, archivo, url, categoria, material, tipo_archivo)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE 
          codigo = VALUES(codigo),
          nombre = VALUES(nombre),
          categoria = VALUES(categoria),
          material = VALUES(material);
      `;

      await pool.execute(query, [codigo, titulo, archivo, url, categoria, material, ext]);
    }

    console.log('✅ Base de datos MySQL poblada correctamente.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error al poblar MySQL:', error);
    process.exit(1);
  }
}

poblarBaseDeDatos();
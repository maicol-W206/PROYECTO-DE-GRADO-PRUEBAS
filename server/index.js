import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import bcrypt from 'bcryptjs';
import 'dotenv/config';
import pool from './db.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Directorio de almacenamiento para PDFs y DXFs
const docsDir = path.join(process.cwd(), '../public/docs');
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir, { recursive: true });
}

app.use('/docs', express.static(docsDir));

// Autocreación de estructura, sincronización de columnas y depuración de registros obsoletos
async function inicializarTablas() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS solicitudes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        codigo VARCHAR(100) DEFAULT 'FICHA',
        titulo VARCHAR(255) DEFAULT 'Sin Título',
        descripcion TEXT,
        solicitante VARCHAR(100) DEFAULT 'Asesor',
        tipo VARCHAR(100) DEFAULT 'Otros',
        estado VARCHAR(50) DEFAULT 'Pendiente',
        fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    const columnasAjustar = [
      `ALTER TABLE solicitudes MODIFY COLUMN codigo VARCHAR(100) DEFAULT 'FICHA'`,
      `ALTER TABLE solicitudes MODIFY COLUMN titulo VARCHAR(255) DEFAULT 'Sin Título'`,
      `ALTER TABLE solicitudes ADD COLUMN solicitante VARCHAR(100) DEFAULT 'Asesor'`,
      `ALTER TABLE solicitudes MODIFY COLUMN solicitante VARCHAR(100) DEFAULT 'Asesor'`,
      `ALTER TABLE solicitudes MODIFY COLUMN tipo VARCHAR(100) DEFAULT 'Otros'`,
      `ALTER TABLE solicitudes MODIFY COLUMN estado VARCHAR(50) DEFAULT 'Pendiente'`
    ];

    for (const sql of columnasAjustar) {
      try { await pool.query(sql); } catch (e) {}
    }

    // Depuración automática de solicitudes antiguas que ya están aprobadas en 'piezas'
    await pool.query(`DELETE FROM solicitudes WHERE estado = 'Aprobada'`);

    console.log('✅ Base de datos sincronizada y duplicados antiguos depurados.');
  } catch (err) {
    console.error('⚠️ Error al inicializar tablas:', err.message);
  }
}
inicializarTablas();

// Helpers de inferencia de datos
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

// Configuración Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, docsDir),
  filename: (req, file, cb) => cb(null, file.originalname)
});
const upload = multer({ storage });

// Autenticación de Usuarios (Login)
app.post(['/api/auth/login', '/api/login'], async (req, res) => {
  try {
    const { usuario, password, username, contrasena } = req.body;
    const userFinal = usuario || username;
    const passFinal = password || contrasena;

    if (!userFinal || !passFinal) return res.status(400).json({ error: 'Ingresa usuario y contraseña.' });

    const [rows] = await pool.query('SELECT * FROM usuarios WHERE usuario = ?', [userFinal]);
    if (rows.length === 0) return res.status(401).json({ error: 'Usuario o contraseña incorrectos.' });

    const userDb = rows[0];
    const coincide = await bcrypt.compare(passFinal, userDb.password);
    if (!coincide) return res.status(401).json({ error: 'Usuario o contraseña incorrectos.' });

    res.json({
      message: 'Autenticación exitosa',
      usuario: { id: userDb.id, nombreUsuario: userDb.usuario, nombre: userDb.usuario, rol: userDb.rol || 'admin' }
    });
  } catch (error) {
    console.error('Error en autenticación:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// ENDPOINT DEL CATÁLOGO PÚBLICO (Exclusivamente Fichas Oficiales Aprobadas en 'piezas')
app.get('/api/catalogo', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        id, 
        codigo, 
        nombre, 
        nombre AS titulo, 
        archivo, 
        url, 
        categoria, 
        categoria AS tipo, 
        material, 
        tipo_archivo 
      FROM piezas 
      ORDER BY id DESC
    `);
    res.json(rows);
  } catch (error) {
    console.error('Error al consultar el catálogo público:', error);
    res.status(500).json({ error: 'Error al obtener el catálogo público.' });
  }
});

// CONSULTA UNIFICADA SIN DUPLICADOS (Para Paneles de Admin y Asesor)
app.get(['/api/piezas', '/api/solicitudes'], async (req, res) => {
  try {
    let piezasOficiales = [];
    let solicitudes = [];

    try {
      const [rowsPiezas] = await pool.query(`
        SELECT 
          id, codigo, nombre AS titulo, nombre, archivo, url, 
          categoria AS tipo, categoria, material, tipo_archivo, 
          'Aprobada' AS estado, 'piezas' AS origen 
        FROM piezas 
        ORDER BY id DESC
      `);
      piezasOficiales = rowsPiezas;
    } catch (e) {}

    try {
      const [rowsSol] = await pool.query(`
        SELECT 
          id, codigo, titulo, descripcion, 
          SUBSTRING_INDEX(descripcion, '/docs/', -1) AS archivo, 
          IFNULL(tipo, 'Otros') AS tipo, IFNULL(estado, 'Pendiente') AS estado, 
          'solicitudes' AS origen 
        FROM solicitudes 
        WHERE estado != 'Aprobada'
        ORDER BY id DESC
      `);
      solicitudes = rowsSol;
    } catch (e) {}

    res.json([...solicitudes, ...piezasOficiales]);
  } catch (error) {
    console.error('Error al consultar:', error);
    res.status(500).json({ error: 'Error al consultar MySQL' });
  }
});

// Subida de archivos (Asesor -> Pendiente / Admin -> Registro directo en Catálogo)
app.post('/api/piezas/upload', upload.single('archivo'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No se envió ningún archivo' });

    const fileName = req.file.originalname;
    const esAsesor = req.query.rol === 'asesor';

    const { codigo, titulo } = separarCodigo(fileName);
    const categoria = detectarCategoria(fileName);
    const material = detectarMaterial(fileName);
    const ext = path.extname(fileName).substring(1).toUpperCase();
    const url = `/docs/${fileName}`;

    if (esAsesor) {
      const querySol = `
        INSERT INTO solicitudes (codigo, titulo, descripcion, solicitante, tipo, estado)
        VALUES (?, ?, ?, 'Asesor', ?, 'Pendiente')
      `;
      await pool.execute(querySol, [codigo || 'FICHA', titulo || fileName, url, categoria || 'Otros']);

      return res.status(201).json({
        message: 'Se ha enviado la petición al administrador.',
        archivo: fileName,
        esSolicitud: true
      });
    } else {
      await pool.query('DELETE FROM piezas WHERE archivo = ?', [fileName]);
      const queryPieza = `
        INSERT INTO piezas (codigo, nombre, archivo, url, categoria, material, tipo_archivo)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
      const [result] = await pool.execute(queryPieza, [
        codigo || 'FICHA', titulo || fileName, fileName, url, categoria || 'Otros', material || 'No especificado', ext || 'PDF'
      ]);

      return res.status(201).json({
        message: 'Ficha técnica registrada e integrada con éxito al catálogo.',
        id: result.insertId,
        archivo: fileName,
        esSolicitud: false
      });
    }
  } catch (error) {
    console.error('Error al subir archivo:', error);
    res.status(500).json({ error: 'Error al guardar en base de datos: ' + error.message });
  }
});

// Aprobar solicitud (Transfiere el archivo a 'piezas' para el catálogo y elimina de 'solicitudes')
app.put('/api/solicitudes/:id/aprobar', async (req, res) => {
  const { id } = req.params;
  try {
    const [solicitudes] = await pool.query('SELECT * FROM solicitudes WHERE id = ?', [id]);
    if (solicitudes.length === 0) return res.status(404).json({ error: 'Solicitud no encontrada.' });

    const sol = solicitudes[0];
    const fileName = path.basename(sol.descripcion || sol.titulo || '');
    const { codigo, titulo } = separarCodigo(fileName);
    const categoria = sol.tipo || detectarCategoria(fileName);
    const material = detectarMaterial(fileName);
    const ext = path.extname(fileName).substring(1).toUpperCase() || 'PDF';
    const url = sol.descripcion || `/docs/${fileName}`;

    // 1. Insertar o reemplazar en el Catálogo Oficial (piezas)
    await pool.query('DELETE FROM piezas WHERE archivo = ?', [fileName]);
    await pool.execute(
      `INSERT INTO piezas (codigo, nombre, archivo, url, categoria, material, tipo_archivo)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [codigo || 'FICHA', titulo || fileName, fileName, url, categoria || 'Otros', material || 'No especificado', ext]
    );

    // 2. Eliminar de la cola de solicitudes
    await pool.query('DELETE FROM solicitudes WHERE id = ?', [id]);

    res.json({ message: 'Petición aprobada e integrada con éxito al catálogo público.' });
  } catch (error) {
    console.error('Error al aprobar solicitud:', error);
    res.status(500).json({ error: 'Error al integrar al catálogo.' });
  }
});

// Rechazar solicitud (Marca el estado como 'Rechazada')
app.put('/api/solicitudes/:id/rechazar', async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('UPDATE solicitudes SET estado = "Rechazada" WHERE id = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Solicitud no encontrada.' });
    res.json({ message: 'Solicitud rechazada con éxito.' });
  } catch (error) {
    console.error('Error al rechazar solicitud:', error);
    res.status(500).json({ error: 'Error al rechazar la solicitud.' });
  }
});

// Eliminar archivo físico y registros en base de datos
app.delete('/api/piezas/:id', async (req, res) => {
  const { id } = req.params;
  const { origen } = req.query;

  try {
    let tablaPrincipal = origen === 'solicitudes' ? 'solicitudes' : 'piezas';
    let [filas] = await pool.query(`SELECT * FROM ${tablaPrincipal} WHERE id = ?`, [id]);

    if (filas.length === 0) {
      tablaPrincipal = tablaPrincipal === 'piezas' ? 'solicitudes' : 'piezas';
      [filas] = await pool.query(`SELECT * FROM ${tablaPrincipal} WHERE id = ?`, [id]);
    }

    if (filas.length > 0) {
      const item = filas[0];
      let nombreArchivo = item.archivo || item.nombre;
      if (!nombreArchivo && item.descripcion) {
        const matchPdf = item.descripcion.match(/\/docs\/[^\s]+/);
        if (matchPdf) nombreArchivo = path.basename(matchPdf[0]);
      }

      const archivoLimpio = nombreArchivo ? path.basename(nombreArchivo) : '';
      if (archivoLimpio) {
        try {
          const rutaArchivo = path.join(docsDir, archivoLimpio);
          if (fs.existsSync(rutaArchivo)) fs.unlinkSync(rutaArchivo);
        } catch (e) {}
      }

      await pool.query('DELETE FROM piezas WHERE id = ? OR archivo = ?', [id, archivoLimpio]);
      await pool.query('DELETE FROM solicitudes WHERE id = ? OR descripcion LIKE ?', [id, `%${archivoLimpio}%`]);
    }

    res.json({ message: 'PDF eliminado correctamente.' });
  } catch (error) {
    console.error('Error al eliminar:', error);
    res.status(500).json({ error: 'Error interno al eliminar.' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor backend activo en http://localhost:${PORT}`);
});
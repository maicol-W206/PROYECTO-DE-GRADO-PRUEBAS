import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import pool from './db.js';
import bcrypt from 'bcryptjs';
import 'dotenv/config';
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Servir archivos PDF/DXF estáticos
app.use('/docs', express.static(path.join(process.cwd(), '../public/docs')));

// Helpers para extraer datos del nombre del archivo
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

// Configurar almacenamiento de Multer en public/docs
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), '../public/docs'));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

// -------------------------------------------------------------
// ENDPOINTS
// -------------------------------------------------------------

// 1. Obtener todas las piezas para el catálogo de React
app.get('/api/piezas', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM piezas ORDER BY id DESC');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener piezas:', error);
    res.status(500).json({ error: 'Error al consultar MySQL' });
  }
});

// 2. Verificar si un archivo PDF/DXF ya existe en la BD
app.get('/api/piezas/verificar', async (req, res) => {
  try {
    const { nombreArchivo } = req.query;
    if (!nombreArchivo) return res.status(400).json({ error: 'Falta el nombre del archivo' });

    const [rows] = await pool.query('SELECT id, codigo, nombre FROM piezas WHERE archivo = ?', [nombreArchivo]);

    if (rows.length > 0) {
      return res.json({ existe: true, pieza: rows[0] });
    }
    return res.json({ existe: false });
  } catch (error) {
    console.error('Error al verificar en MySQL:', error);
    res.status(500).json({ error: 'Error en la consulta' });
  }
});

// 3. Subir un nuevo archivo
app.post('/api/piezas/upload', upload.single('archivo'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No se envió ningún archivo' });

    const fileName = req.file.originalname;

    // Validación preventiva en MySQL
    const [existentes] = await pool.query('SELECT id FROM piezas WHERE archivo = ?', [fileName]);
    if (existentes.length > 0) {
      return res.status(409).json({ error: 'El archivo ya existe en la base de datos', existe: true });
    }

    const { codigo, titulo } = separarCodigo(fileName);
    const categoria = detectarCategoria(fileName);
    const material = detectarMaterial(fileName);
    const ext = path.extname(fileName).substring(1).toUpperCase();
    const url = `/docs/${fileName}`;

    const query = `
      INSERT INTO piezas (codigo, nombre, archivo, url, categoria, material, tipo_archivo)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await pool.execute(query, [codigo, titulo, fileName, url, categoria, material, ext]);

    res.status(201).json({
      message: 'Ficha técnica registrada e integrada con éxito.',
      id: result.insertId,
      archivo: fileName
    });
  } catch (error) {
    console.error('Error al subir:', error);
    res.status(500).json({ error: 'Error al guardar el archivo' });
  }
});

// 4. ENDPOINT DE AUTENTICACIÓN (LOGIN) CON CONTRASEÑA ENCRIPTADA BCRYPT
app.post('/api/auth/login', async (req, res) => {
  try {
    const { usuario, password } = req.body;

    if (!usuario || !password) {
      return res.status(400).json({ error: 'Ingresa nombre de usuario y contraseña.' });
    }

    // Buscar en MySQL por el campo 'usuario'
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE usuario = ?', [usuario]);
    
    if (rows.length === 0) {
      return res.status(401).json({ error: 'Usuario o contraseña incorrectos.' });
    }

    const userDb = rows[0];

    // Comparar contraseña ingresada con el hash cifrado
    const coincide = await bcrypt.compare(password, userDb.password);

    if (!coincide) {
      return res.status(401).json({ error: 'Usuario o contraseña incorrectos.' });
    }

    res.json({
      message: 'Autenticación exitosa',
      usuario: {
        id: userDb.id,
        nombreUsuario: userDb.usuario,
        rol: userDb.rol
      }
    });
  } catch (error) {
    console.error('Error en autenticación:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor backend escuchando en http://localhost:${PORT}`);
});
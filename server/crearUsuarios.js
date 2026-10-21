import bcrypt from 'bcryptjs';
import 'dotenv/config';
import pool from './db.js';
import bcrypt from 'bcryptjs';

async function initUsuarios() {
  try {
    // 1. Recrear la tabla usuarios
    await pool.query('DROP TABLE IF EXISTS usuarios;');

    await pool.query(`
      CREATE TABLE usuarios (
        id INT AUTO_INCREMENT PRIMARY KEY,
        usuario VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        rol VARCHAR(50) DEFAULT 'asesor',
        creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 2. Hashear la contraseña por defecto ("123456")
    const hashedPassword = await bcrypt.hash('123456', 10);

    // 3. Registrar los dos usuarios: 'asesor' y 'admin'
    await pool.query(
      `INSERT INTO usuarios (usuario, password, rol) VALUES 
       (?, ?, 'asesor'),
       (?, ?, 'admin')`,
      ['asesor', hashedPassword, 'admin', hashedPassword]
    );

    console.log('✅ Tabla usuarios recreada.');
    console.log('✅ Usuarios "asesor" y "admin" registrados con contraseña cifrada (123456).');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error al crear usuarios:', error);
    process.exit(1);
  }
}

initUsuarios();
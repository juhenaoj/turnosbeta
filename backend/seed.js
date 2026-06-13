const pool = require('./db')
const bcrypt = require('bcrypt')

async function crearUsuarioAdmin() {
  const nombre = 'Administrador'
  const email = 'admin@turnosbeta.com'
  const password = 'Colombia2023'
  const rol = 'admin'

  const passwordEncriptado = await bcrypt.hash(password, 10)

  await pool.query(
    'INSERT INTO usuarios (nombre, email, password, rol) VALUES ($1, $2, $3, $4)',
    [nombre, email, passwordEncriptado, rol]
  )

  console.log('Usuario admin creado correctamente')
  process.exit()
}

crearUsuarioAdmin()
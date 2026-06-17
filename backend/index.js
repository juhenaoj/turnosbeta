const express = require('express')
const cors = require('cors')
const pool = require('./db')
const bcrypt = require('bcrypt')

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body

  try {
    const resultado = await pool.query(
      'SELECT * FROM usuarios WHERE email = $1',
      [email]
    )

    if (resultado.rows.length === 0) {
      return res.status(401).json({ ok: false, mensaje: 'Credenciales incorrectas' })
    }

    const usuario = resultado.rows[0]
    const passwordValido = await bcrypt.compare(password, usuario.password)

    if (!passwordValido) {
      return res.status(401).json({ ok: false, mensaje: 'Credenciales incorrectas' })
    }

    res.json({
      ok: true,
      mensaje: 'Login exitoso',
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol
      }
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({ ok: false, mensaje: 'Error en el servidor' })
  }
})

app.get('/api/empleados', async (req, res) => {
  try {
    const resultado = await pool.query(
      'SELECT * FROM empleados ORDER BY nombre ASC'
    )
    res.json({ ok: true, empleados: resultado.rows })
  } catch (error) {
    console.error(error)
    res.status(500).json({ ok: false, mensaje: 'Error en el servidor' })
  }
})

app.post('/api/empleados', async (req, res) => {
  const { nombre, email, telefono, cargo } = req.body
  try {
    const resultado = await pool.query(
      'INSERT INTO empleados (nombre, email, telefono, cargo) VALUES ($1, $2, $3, $4) RETURNING *',
      [nombre, email, telefono, cargo]
    )
    res.json({ ok: true, empleado: resultado.rows[0] })
  } catch (error) {
    console.error(error)
    res.status(500).json({ ok: false, mensaje: 'Error en el servidor' })
  }
})

app.put('/api/empleados/:id', async (req, res) => {
  const { id } = req.params
  const { nombre, email, telefono, cargo } = req.body
  try {
    const resultado = await pool.query(
      'UPDATE empleados SET nombre=$1, email=$2, telefono=$3, cargo=$4 WHERE id=$5 RETURNING *',
      [nombre, email, telefono, cargo, id]
    )
    res.json({ ok: true, empleado: resultado.rows[0] })
  } catch (error) {
    console.error(error)
    res.status(500).json({ ok: false, mensaje: 'Error en el servidor' })
  }
})

app.listen(PORT, () => {
  console.log('servidor corriendo en http://localhost:' + PORT)
})
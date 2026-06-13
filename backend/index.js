const express = require('express')
const cors = require('cors')
const pool = require('./db')

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

const bcrypt = require('bcrypt')

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

app.listen(PORT,() => {
    console.log("servidor corriendo en http://localhost:" + PORT)
})
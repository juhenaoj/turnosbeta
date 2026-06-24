import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import logo from '../assets/Logo-Jaramillo-Villegas-color-hEMLZW0V.png'

function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    const respuesta = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })

    const datos = await respuesta.json()
    if (datos.ok) {
      localStorage.setItem('usuario', JSON.stringify(datos.usuario))
      navigate('/dashboard')
    } else {
      alert(datos.mensaje)
    }
  }

  return (
    <div className="login-container">

      <div className="login-header">
        <img src={logo} alt="Logo" className="login-logo" />
        <h1>TurnosBeta</h1>
        <p>Ingresa tus datos para continuar</p>
      </div>

      <div className="form-group">
        <label>Correo electrónico</label>
        <input
          type="email"
          placeholder="tu@empresa.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Contraseña</label>
        <input
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button className="btn-login" onClick={handleLogin}>Iniciar sesión</button>

      <a href="#" className="forgot">¿Olvidaste tu contraseña?</a>

    </div>
  )
}

export default LoginPage
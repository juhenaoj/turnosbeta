import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function LoginPage() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

const handleLogin = () => {
  console.log('Email:', email)
  console.log('Password:', password)
  navigate('/dashboard')
}

  return (
    <div className="login-container">

      <div className="login-header">
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


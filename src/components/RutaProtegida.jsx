import { Navigate } from 'react-router-dom'

function RutaProtegida({ children }) {
  const usuario = localStorage.getItem('usuario')

  if (!usuario) {
    return <Navigate to="/" />
  }

  return children
}

export default RutaProtegida
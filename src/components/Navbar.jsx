import { Link } from 'react-router-dom'

function Navbar() {
  const usuario = JSON.parse(localStorage.getItem('usuario'))

  return (
    <div className="dashboard-nav">
      <div style={{display:'flex', gap:'8px'}}>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/empleados">Empleados</Link>
        <Link to="/cuadrante">Cuadrante</Link>
        <Link to="/solicitudes">Solicitudes</Link>
        <Link to="/reportes">Reportes</Link>
      </div>
      {usuario && (
        <div style={{fontSize:'13px', color:'#1B2A4A', fontWeight:'500'}}>
          👤 {usuario.nombre}
        </div>
      )}
    </div>
  )
}

export default Navbar
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

function Dashboard() {
  const [dashboard, setDashboard] = useState(null)

  useEffect(() => {
    fetch('http://localhost:3000/api/dashboard')
      .then(r => r.json())
      .then(datos => setDashboard(datos.dashboard))
  }, [])

  if (!dashboard) return <div>Cargando...</div>

  return (
    <div className="dashboard">

      <Navbar />

      <div className="dashboard-header">
        <h1>TurnosBeta</h1>
        <p>Panel del supervisor</p>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <span className="stat-number">{dashboard.totalEmpleados}</span>
          <span className="stat-label">Total empleados</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{dashboard.empleadosHoy}</span>
          <span className="stat-label">Trabajando hoy</span>
        </div>
        <div className="stat-card alerta">
          <span className="stat-number">{dashboard.turnosSinCubrir}</span>
          <span className="stat-label">Turnos sin cubrir</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{dashboard.solicitudesPendientes}</span>
          <span className="stat-label">Solicitudes pendientes</span>
        </div>
      </div>

      <div className="dashboard-section">
        <h2 className="section-title">Accesos rápidos</h2>
        <div style={{display:'flex', gap:'12px', flexWrap:'wrap'}}>
          <Link to="/empleados" style={{padding:'12px 20px', background:'#1B8FA8', color:'#fff', borderRadius:'8px', textDecoration:'none', fontSize:'14px', fontWeight:'500'}}>Ver empleados</Link>
          <Link to="/cuadrante" style={{padding:'12px 20px', background:'#1B8FA8', color:'#fff', borderRadius:'8px', textDecoration:'none', fontSize:'14px', fontWeight:'500'}}>Ver cuadrante</Link>
          <Link to="/solicitudes" style={{padding:'12px 20px', background:'#1B8FA8', color:'#fff', borderRadius:'8px', textDecoration:'none', fontSize:'14px', fontWeight:'500'}}>Ver solicitudes</Link>
          <Link to="/reportes" style={{padding:'12px 20px', background:'#1B8FA8', color:'#fff', borderRadius:'8px', textDecoration:'none', fontSize:'14px', fontWeight:'500'}}>Ver reportes</Link>
        </div>
      </div>

    </div>
  )
}

export default Dashboard
import { useState, useEffect } from 'react'
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



    </div>
  )
}

export default Dashboard
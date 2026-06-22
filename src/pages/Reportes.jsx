import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'

function Reportes() {
  const [reporte, setReporte] = useState(null)

  useEffect(() => {
    fetch('http://localhost:3000/api/reportes')
      .then(r => r.json())
      .then(datos => setReporte(datos.reporte))
  }, [])

  if (!reporte) return <div>Cargando...</div>

  return (
    <div className="reportes-container">

      <Navbar />

      <div className="reportes-header">
        <h1>Reportes</h1>
        <p>Resumen general del sistema</p>
      </div>

      <div className="reportes-grid">

        <div className="reporte-card">
          <span className="reporte-numero">{reporte.totalEmpleados}</span>
          <span className="reporte-label">Total empleados</span>
        </div>

        <div className="reporte-card">
          <span className="reporte-numero">{reporte.totalAsignaciones}</span>
          <span className="reporte-label">Turnos asignados</span>
        </div>

        <div className="reporte-card alerta-amber">
          <span className="reporte-numero">{reporte.solicitudesPendientes}</span>
          <span className="reporte-label">Solicitudes pendientes</span>
        </div>

        <div className="reporte-card alerta-green">
          <span className="reporte-numero">{reporte.solicitudesAprobadas}</span>
          <span className="reporte-label">Solicitudes aprobadas</span>
        </div>

        <div className="reporte-card alerta-red">
          <span className="reporte-numero">{reporte.solicitudesRechazadas}</span>
          <span className="reporte-label">Solicitudes rechazadas</span>
        </div>

      </div>

    </div>
  )
}

export default Reportes
function Dashboard () {
  return (
    <><div className='dashboard-header'>
          <h1>TurnosBeta</h1>
          <p>Panel del supervisor</p>
      </div><div className="dashboard-stats">

              <div className="stat-card">
                  <span className="stat-number">8</span>
                  <span className="stat-label">Trabajando ahora</span>
              </div>

              <div className="stat-card">
                  <span className="stat-number">1</span>
                  <span className="stat-label">Con permiso hoy</span>
              </div>

              <div className="stat-card alerta">
                  <span className="stat-number">2</span>
                  <span className="stat-label">Turnos sin cubrir</span>
              </div>

              <div className="stat-card">
                  <span className="stat-number">12</span>
                  <span className="stat-label">Solicitudes pendientes</span>
              </div>

          </div></>
  )
}
export default Dashboard
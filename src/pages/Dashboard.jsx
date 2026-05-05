function Dashboard() {
  return (
    <div className="dashboard">

      <div className="dashboard-header">
        <h1>TurnosBeta</h1>
        <p>Panel del supervisor</p>
      </div>

      <div className="dashboard-stats">
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
      </div>

      <div className="dashboard-section">
        <h2 className="section-title">Estado del equipo hoy</h2>
        <div className="team-table">
          <div className="table-header">
            <span>Empleado</span>
            <span>Turno hoy</span>
            <span>Horas semana</span>
            <span>Estado</span>
          </div>
          <div className="table-row">
            <span>Ana García</span>
            <span>Mañana</span>
            <span>40h</span>
            <span className="badge badge-green">Activa</span>
          </div>
          <div className="table-row">
            <span>Luis Pérez</span>
            <span>Tarde</span>
            <span>40h</span>
            <span className="badge badge-blue">En horario</span>
          </div>
          <div className="table-row">
            <span>Carlos Ríos</span>
            <span>Permiso</span>
            <span>32h</span>
            <span className="badge badge-amber">Permiso</span>
          </div>
          <div className="table-row alerta">
            <span>Sara Ruiz</span>
            <span>Tarde</span>
            <span className="horas-alerta">56h ⚠</span>
            <span className="badge badge-red">Límite</span>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Dashboard
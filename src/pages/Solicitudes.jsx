import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'

function Solicitudes() {
  const [solicitudes, setSolicitudes] = useState([])
  const [empleados, setEmpleados] = useState([])
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState('')
  const [tipo, setTipo] = useState('')
  const [fechaInicio, setFechaInicio] = useState('')
  const [fechaFin, setFechaFin] = useState('')
  const [motivo, setMotivo] = useState('')

  useEffect(() => {
    fetch('http://localhost:3000/api/solicitudes')
      .then(r => r.json())
      .then(datos => setSolicitudes(datos.solicitudes))

    fetch('http://localhost:3000/api/empleados')
      .then(r => r.json())
      .then(datos => setEmpleados(datos.empleados))
  }, [])

  const handleCrearSolicitud = async () => {
    const respuesta = await fetch('http://localhost:3000/api/solicitudes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        empleado_id: empleadoSeleccionado,
        tipo,
        fecha_inicio: fechaInicio,
        fecha_fin: fechaFin,
        motivo
      })
    })
    const datos = await respuesta.json()
    if (datos.ok) {
      const empleado = empleados.find(e => e.id === Number(empleadoSeleccionado))
      setSolicitudes([...solicitudes, {
        ...datos.solicitud,
        empleado_nombre: empleado.nombre
      }])
      setEmpleadoSeleccionado('')
      setTipo('')
      setFechaInicio('')
      setFechaFin('')
      setMotivo('')
    }
  }

  const handleCambiarEstado = async (id, estado) => {
    const respuesta = await fetch(`http://localhost:3000/api/solicitudes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ estado })
    })
    const datos = await respuesta.json()
    if (datos.ok) {
      setSolicitudes(solicitudes.map(s =>
        s.id === id ? { ...s, estado } : s
      ))
    }
  }

  return (
    <div className="solicitudes-container">

      <Navbar />

      <div className="solicitudes-header">
        <h1>Solicitudes de permiso</h1>
        <p>Gestión de permisos y ausencias del personal</p>
      </div>

      <div className="solicitudes-form">
        <select value={empleadoSeleccionado} onChange={(e) => setEmpleadoSeleccionado(e.target.value)}>
          <option value="">Selecciona un empleado</option>
          {empleados.map(e => (
            <option key={e.id} value={e.id}>{e.nombre}</option>
          ))}
        </select>

        <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <option value="">Tipo de permiso</option>
          <option value="permiso">Permiso</option>
          <option value="vacaciones">Vacaciones</option>
          <option value="incapacidad">Incapacidad médica</option>
          <option value="ausencia">Ausencia injustificada</option>
        </select>

        <input type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} />
        <input type="date" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} />
        <input type="text" placeholder="Motivo" value={motivo} onChange={(e) => setMotivo(e.target.value)} />

        <button onClick={handleCrearSolicitud}>Crear solicitud</button>
      </div>

      <div className="solicitudes-tabla">
        <div className="solicitudes-fila-header">
          <span>Empleado</span>
          <span>Tipo</span>
          <span>Inicio</span>
          <span>Fin</span>
          <span>Estado</span>
          <span>Acciones</span>
        </div>

        {solicitudes.map((s) => (
          <div className="solicitudes-fila" key={s.id}>
            <span>{s.empleado_nombre}</span>
            <span>{s.tipo}</span>
            <span>{s.fecha_inicio?.split('T')[0]}</span>
            <span>{s.fecha_fin?.split('T')[0]}</span>
            
            <span className={`badge ${s.estado === 'aprobada' ? 'badge-green' : s.estado === 'rechazada' ? 'badge-red' : 'badge-amber'}`}>
              {s.estado}
            </span>
            <div style={{display:'flex', gap:'6px'}}>
              <button className="btn-aprobar" onClick={() => handleCambiarEstado(s.id, 'aprobada')}>Aprobar</button>
              <button className="btn-rechazar" onClick={() => handleCambiarEstado(s.id, 'rechazada')}>Rechazar</button>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default Solicitudes
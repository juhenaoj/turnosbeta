import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'

function Cuadrante() {
  const [empleados, setEmpleados] = useState([])
  const [turnos, setTurnos] = useState([])
  const [asignaciones, setAsignaciones] = useState([])

  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState('')
  const [turnoSeleccionado, setTurnoSeleccionado] = useState('')
  const [fechaSeleccionada, setFechaSeleccionada] = useState('')

  useEffect(() => {
    fetch('http://localhost:3000/api/empleados')
      .then(respuesta => respuesta.json())
      .then(datos => setEmpleados(datos.empleados))

    fetch('http://localhost:3000/api/turnos')
      .then(respuesta => respuesta.json())
      .then(datos => setTurnos(datos.turnos))

    fetch('http://localhost:3000/api/asignaciones')
      .then(respuesta => respuesta.json())
      .then(datos => setAsignaciones(datos.asignaciones))
  }, [])

  const handleAsignarTurno = async () => {
    const respuesta = await fetch('http://localhost:3000/api/asignaciones', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        empleado_id: empleadoSeleccionado,
        turno_id: turnoSeleccionado,
        fecha: fechaSeleccionada
      })
    })

    const datos = await respuesta.json()

    if (datos.ok) {
      const empleado = empleados.find(e => e.id === Number(empleadoSeleccionado))
      const turno = turnos.find(t => t.id === Number(turnoSeleccionado))

      const nuevaAsignacion = {
        ...datos.asignacion,
        empleado_nombre: empleado.nombre,
        turno_nombre: turno.nombre
      }

      setAsignaciones([...asignaciones, nuevaAsignacion])
      setEmpleadoSeleccionado('')
      setTurnoSeleccionado('')
      setFechaSeleccionada('')
    }
  }

  return (
    <div className="cuadrante-container">

      <Navbar />

      <div className="cuadrante-header">
        <h1>Cuadrante de turnos</h1>
        <p>Asigna turnos al personal</p>
      </div>

      <div className="cuadrante-form">

        <select
          value={empleadoSeleccionado}
          onChange={(e) => setEmpleadoSeleccionado(e.target.value)}
        >
          <option value="">Selecciona un empleado</option>
          {empleados.map((empleado) => (
            <option key={empleado.id} value={empleado.id}>
              {empleado.nombre}
            </option>
          ))}
        </select>

        <select
          value={turnoSeleccionado}
          onChange={(e) => setTurnoSeleccionado(e.target.value)}
        >
          <option value="">Selecciona un turno</option>
          {turnos.map((turno) => (
            <option key={turno.id} value={turno.id}>
              {turno.nombre}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={fechaSeleccionada}
          onChange={(e) => setFechaSeleccionada(e.target.value)}
        />

        <button onClick={handleAsignarTurno}>Asignar turno</button>

      </div>

      <div className="cuadrante-tabla">

        <div className="cuadrante-fila-header">
          <span>Empleado</span>
          <span>Turno</span>
          <span>Fecha</span>
          <span>Estado</span>
        </div>

        {asignaciones.map((asignacion) => (
          <div className="cuadrante-fila" key={asignacion.id}>
            <span>{asignacion.empleado_nombre}</span>
            <span>{asignacion.turno_nombre}</span>
            <span>{asignacion.fecha}</span>
            <span className="badge badge-blue">{asignacion.estado}</span>
          </div>
        ))}

      </div>

    </div>
  )
}

export default Cuadrante
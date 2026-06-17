import { useState, useEffect } from 'react'

function Empleados() {
  const [empleados, setEmpleados] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/api/empleados')
      .then(respuesta => respuesta.json())
      .then(datos => setEmpleados(datos.empleados))
  }, [])

  return (
    <div className="empleados-container">

      <div className="empleados-header">
        <h1>Empleados</h1>
        <p>Gestión del personal de la empresa</p>
      </div>

      <div className="empleados-tabla">

        <div className="empleados-fila-header">
          <span>Nombre</span>
          <span>Email</span>
          <span>Teléfono</span>
          <span>Cargo</span>
        </div>

        {empleados.map((empleado) => (
          <div className="empleados-fila" key={empleado.id}>
            <span>{empleado.nombre}</span>
            <span>{empleado.email}</span>
            <span>{empleado.telefono}</span>
            <span>{empleado.cargo}</span>
          </div>
        ))}

      </div>

    </div>
  )
}

export default Empleados
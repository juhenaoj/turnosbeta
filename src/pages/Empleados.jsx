import { useState, useEffect } from 'react'

function Empleados() {
  const [empleados, setEmpleados] = useState([])
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [telefono, setTelefono] = useState('')
  const [cargo, setCargo] = useState('')

  useEffect(() => {
    fetch('http://localhost:3000/api/empleados')
      .then(respuesta => respuesta.json())
      .then(datos => setEmpleados(datos.empleados))
  }, [])

  const handleAgregarEmpleado = async () => {
    const respuesta = await fetch('http://localhost:3000/api/empleados', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nombre, email, telefono, cargo })
    })

    const datos = await respuesta.json()

    if (datos.ok) {
      setEmpleados([...empleados, datos.empleado])
      setNombre('')
      setEmail('')
      setTelefono('')
      setCargo('')
    }
  }

  return (
    <div className="empleados-container">

      <div className="empleados-header">
        <h1>Empleados</h1>
        <p>Gestión del personal de la empresa</p>
      </div>

      <div className="empleados-form">
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Teléfono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
        />
        <input
          type="text"
          placeholder="Cargo"
          value={cargo}
          onChange={(e) => setCargo(e.target.value)}
        />
        <button onClick={handleAgregarEmpleado}>Agregar empleado</button>
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
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className="dashboard-nav">
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/empleados">Empleados</Link>
    </div>
  )
}

export default Navbar
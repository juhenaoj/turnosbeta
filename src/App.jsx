import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import Empleados from './pages/Empleados'
import Cuadrante from './pages/Cuadrante'
import Solicitudes from './pages/Solicitudes'
import Reportes from './pages/Reportes'
import RutaProtegida from './components/RutaProtegida'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<RutaProtegida><Dashboard /></RutaProtegida>} />
        <Route path="/empleados" element={<RutaProtegida><Empleados /></RutaProtegida>} />
        <Route path="/cuadrante" element={<RutaProtegida><Cuadrante /></RutaProtegida>} />
        <Route path="/solicitudes" element={<RutaProtegida><Solicitudes /></RutaProtegida>} />
        <Route path="/reportes" element={<RutaProtegida><Reportes /></RutaProtegida>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
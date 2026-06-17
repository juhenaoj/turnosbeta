import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import Empleados from './pages/Empleados'
import Cuadrante from './pages/Cuadrante'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/empleados" element={<Empleados />} />
        <Route path="/cuadrante" element={<Cuadrante />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
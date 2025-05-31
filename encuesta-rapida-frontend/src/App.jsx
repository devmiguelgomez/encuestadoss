import './App.css'
import CrearEncuesta from './components/CrearEncuesta'
import VotarEncuesta from './components/VotarEncuesta'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CrearEncuesta />} />
        <Route path="/votar/:codigo" element={<VotarEncuesta />} />
        {/* Puedes agregar aquí la ruta de resultados si tienes el componente */}
      </Routes>
    </BrowserRouter>
  )
}

export default App

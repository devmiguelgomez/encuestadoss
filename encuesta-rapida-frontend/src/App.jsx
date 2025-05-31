import './App.css'
import CrearEncuesta from './components/CrearEncuesta'
import VotarEncuesta from './components/VotarEncuesta'
import ResultadosEncuesta from './components/ResultadosEncuesta'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CrearEncuesta />} />
        <Route path="/votar/:codigo" element={<VotarEncuesta />} />
        <Route path="/resultados/:codigo" element={<ResultadosEncuesta />} />
        {/* Puedes agregar aquí la ruta de resultados si tienes el componente */}
      </Routes>
    </BrowserRouter>
  )
}

export default App

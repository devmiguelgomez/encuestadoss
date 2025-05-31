import './App.css'
import CrearEncuesta from './components/CrearEncuesta'
import VotarEncuesta from './components/VotarEncuesta'
import ResultadosEncuesta from './components/ResultadosEncuesta'
import Navbar from './components/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function Home() {
  return (
    <div className="container text-center mt-5">
      <h1>Bienvenido a Encuestas Rápidas</h1>
      <p className="lead">Crea, comparte y vota encuestas de forma sencilla.</p>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/crear" element={<CrearEncuesta />} />
        <Route path="/encuesta/:codigo" element={<VotarEncuesta />} />
        <Route path="/resultados/:codigo" element={<ResultadosEncuesta />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

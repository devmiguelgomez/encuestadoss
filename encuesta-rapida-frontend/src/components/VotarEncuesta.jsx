import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const VotarEncuesta = () => {
  const { codigo } = useParams();
  const navigate = useNavigate();
  const [pregunta, setPregunta] = useState('');
  const [opciones, setOpciones] = useState([]);
  const [opcionSeleccionada, setOpcionSeleccionada] = useState('');
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [votando, setVotando] = useState(false);
  const [exito, setExito] = useState(false);

  useEffect(() => {
    // Verificar si ya votó
    if (localStorage.getItem(`votado-${codigo}`)) {
      navigate(`/resultados/${codigo}`);
      return;
    }
    // Obtener datos de la encuesta
    const fetchEncuesta = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/resultados/${codigo}`);
        if (!res.ok) throw new Error('No se pudo cargar la encuesta');
        const data = await res.json();
        setPregunta(data.pregunta);
        setOpciones(data.opciones);
      } catch (err) {
        setError('No se pudo cargar la encuesta');
      } finally {
        setCargando(false);
      }
    };
    fetchEncuesta();
  }, [codigo, navigate]);

  const handleVotar = async (e) => {
    e.preventDefault();
    if (!opcionSeleccionada) {
      setError('Selecciona una opción para votar');
      return;
    }
    setVotando(true);
    setError('');
    try {
      const res = await fetch(`http://localhost:5000/api/votar/${codigo}/votar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ opcion: opcionSeleccionada })
      });
      if (res.status === 403) {
        setError('Ya has votado en esta encuesta desde esta IP.');
        setVotando(false);
        return;
      }
      if (!res.ok) throw new Error('Error al enviar el voto');
      localStorage.setItem(`votado-${codigo}`, 'true');
      setExito(true);
      setTimeout(() => navigate(`/resultados/${codigo}`), 1200);
    } catch (err) {
      setError('Error al enviar el voto');
    } finally {
      setVotando(false);
    }
  };

  if (cargando) return <div className="text-center mt-5">Cargando encuesta...</div>;
  if (error) return <div className="alert alert-danger mt-5 text-center">{error}</div>;

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8 col-xl-6">
          <div className="card shadow-lg border-0" style={{ maxWidth: '700px', margin: '0 auto', background: '#f8fafc' }}>
            <div className="card-body p-5">
              <h2 className="text-center mb-4 text-primary" style={{wordBreak: 'break-word', whiteSpace: 'normal', fontWeight: 700}}>{pregunta}</h2>
              <form onSubmit={handleVotar}>
                <div className="mb-4">
                  {opciones.map((op) => (
                    <div className="form-check mb-3" key={op._id}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="opcion"
                        id={`opcion${op._id}`}
                        value={op._id}
                        checked={opcionSeleccionada === op._id}
                        onChange={() => setOpcionSeleccionada(op._id)}
                        style={{ cursor: 'pointer', boxShadow: '0 0 0 2px #0d6efd33' }}
                      />
                      <label className="form-check-label ms-2" htmlFor={`opcion${op._id}`} style={{ cursor: 'pointer', fontSize: '1.1rem' }}>{op.texto}</label>
                    </div>
                  ))}
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <button type="submit" className="btn btn-primary w-100 shadow-sm" disabled={votando}>
                  {votando ? <span className="spinner-border spinner-border-sm me-2"></span> : <i className="bi bi-send me-2"></i>}
                  Votar
                </button>
                {exito && <div className="alert alert-success mt-3 animate__animated animate__fadeIn">¡Gracias por votar!</div>}
              </form>
            </div>
          </div>
        </div>
      </div>
      <Link to="/crear" className="btn btn-outline-secondary mt-3">
        Crear otra encuesta
      </Link>
    </div>
  );
};

export default VotarEncuesta; 
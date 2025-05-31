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
    try {
      const res = await fetch(`http://localhost:5000/api/votar/${codigo}/votar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ opcion: opcionSeleccionada })
      });
      if (res.status === 403) {
        setError('Ya has votado en esta encuesta desde esta IP.');
        return;
      }
      if (!res.ok) throw new Error('Error al enviar el voto');
      localStorage.setItem(`votado-${codigo}`, 'true');
      navigate(`/resultados/${codigo}`);
    } catch (err) {
      setError('Error al enviar el voto');
    }
  };

  if (cargando) return <div className="text-center mt-5">Cargando encuesta...</div>;
  if (error) return <div className="alert alert-danger mt-5 text-center">{error}</div>;

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8 col-xl-6">
          <div className="card shadow" style={{ maxWidth: '700px', margin: '0 auto' }}>
            <div className="card-body p-5">
              <h2 className="text-center mb-4" style={{wordBreak: 'break-word', whiteSpace: 'normal'}}>{pregunta}</h2>
              <form onSubmit={handleVotar}>
                <div className="mb-4">
                  {opciones.map((op) => (
                    <div className="form-check mb-2" key={op._id}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="opcion"
                        id={`opcion${op._id}`}
                        value={op._id}
                        checked={opcionSeleccionada === op._id}
                        onChange={() => setOpcionSeleccionada(op._id)}
                      />
                      <label className="form-check-label" htmlFor={`opcion${op._id}`}>{op.texto}</label>
                    </div>
                  ))}
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <button type="submit" className="btn btn-primary w-100">Votar</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Link to="/votar/abc123" className="btn btn-secondary mt-3">
        Probar votar encuesta (demo)
      </Link>
    </div>
  );
};

export default VotarEncuesta; 
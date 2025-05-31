import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const colores = [
  'bg-info',
  'bg-success',
  'bg-warning',
  'bg-danger',
  'bg-primary',
  'bg-secondary',
  'bg-dark',
];

const ResultadosEncuesta = () => {
  const { codigo } = useParams();
  const [pregunta, setPregunta] = useState('');
  const [opciones, setOpciones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResultados = async () => {
      try {
        const res = await fetch(`https://encuestadoss-backend.vercel.app/api/resultados/${codigo}`);
        if (!res.ok) throw new Error('No se pudieron cargar los resultados');
        const data = await res.json();
        setPregunta(data.pregunta);
        setOpciones(data.opciones);
      } catch (err) {
        setError('No se pudieron cargar los resultados');
      } finally {
        setCargando(false);
      }
    };
    fetchResultados();
  }, [codigo]);

  const totalVotos = opciones.reduce((acc, op) => acc + (op.votos || 0), 0);
  const maxVotos = Math.max(...opciones.map(op => op.votos || 0), 0);

  if (cargando) return <div className="text-center mt-5">Cargando resultados...</div>;
  if (error) return <div className="alert alert-danger mt-5 text-center">{error}</div>;

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8 col-xl-6">
          <div className="card shadow-lg border-0" style={{ maxWidth: '700px', margin: '0 auto', background: '#f8fafc' }}>
            <div className="card-body p-5">
              <h2 className="text-center mb-4 text-primary">Resultados de la Encuesta</h2>
              <h4 className="mb-4 text-center">{pregunta}</h4>
              {opciones.map((op, idx) => {
                const cantidad = op.votos || 0;
                const porcentaje = totalVotos > 0 ? ((cantidad / totalVotos) * 100).toFixed(1) : 0;
                const esGanadora = cantidad === maxVotos && maxVotos > 0;
                return (
                  <div key={op._id || idx} className="mb-4 animate__animated animate__fadeIn">
                    <div className="d-flex justify-content-between mb-1 align-items-center">
                      <span className="fw-bold" style={{ fontSize: '1.1rem' }}>{op.texto} {esGanadora && <i className="bi bi-trophy-fill text-warning ms-1" title="Opción más votada"></i>}</span>
                      <span className="fw-bold">{cantidad} votos ({porcentaje}%)</span>
                    </div>
                    <div className="progress" style={{ height: '28px', background: '#e9ecef' }}>
                      <div
                        className={`progress-bar progress-bar-striped progress-bar-animated ${colores[idx % colores.length]}`}
                        role="progressbar"
                        style={{ width: `${porcentaje}%`, fontWeight: 'bold', fontSize: '1rem', transition: 'width 1s' }}
                        aria-valuenow={porcentaje}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        {porcentaje}%
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="text-center mt-4">
                <span className="badge bg-primary fs-5 p-3 shadow">Total de votos: {totalVotos}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultadosEncuesta; 
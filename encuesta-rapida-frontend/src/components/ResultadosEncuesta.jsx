import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ResultadosEncuesta = () => {
  const { codigo } = useParams();
  const [pregunta, setPregunta] = useState('');
  const [opciones, setOpciones] = useState([]);
  const [votos, setVotos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResultados = async () => {
      try {
        const res = await fetch(`/api/encuestas/${codigo}/resultados`);
        if (!res.ok) throw new Error('No se pudieron cargar los resultados');
        const data = await res.json();
        setPregunta(data.pregunta);
        setOpciones(data.opciones);
        setVotos(data.votos);
      } catch (err) {
        setError('No se pudieron cargar los resultados');
      } finally {
        setCargando(false);
      }
    };
    fetchResultados();
  }, [codigo]);

  const totalVotos = votos.reduce((acc, v) => acc + v, 0);

  if (cargando) return <div className="text-center mt-5">Cargando resultados...</div>;
  if (error) return <div className="alert alert-danger mt-5 text-center">{error}</div>;

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8 col-xl-6">
          <div className="card shadow" style={{ maxWidth: '700px', margin: '0 auto' }}>
            <div className="card-body p-5">
              <h2 className="text-center mb-4">Resultados de la Encuesta</h2>
              <h4 className="mb-4 text-center">{pregunta}</h4>
              {opciones.map((op, idx) => {
                const cantidad = votos[idx] || 0;
                const porcentaje = totalVotos > 0 ? ((cantidad / totalVotos) * 100).toFixed(1) : 0;
                return (
                  <div key={idx} className="mb-4">
                    <div className="d-flex justify-content-between mb-1">
                      <span>{op}</span>
                      <span>{cantidad} votos ({porcentaje}%)</span>
                    </div>
                    <div className="progress" style={{ height: '28px' }}>
                      <div
                        className="progress-bar bg-info"
                        role="progressbar"
                        style={{ width: `${porcentaje}%`, fontWeight: 'bold', fontSize: '1rem' }}
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
                <strong>Total de votos: {totalVotos}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultadosEncuesta; 
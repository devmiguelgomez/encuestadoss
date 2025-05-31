import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const CrearEncuesta = () => {
  const [pregunta, setPregunta] = useState('');
  const [opciones, setOpciones] = useState(['', '']);
  const [codigoUnico, setCodigoUnico] = useState('');
  const [error, setError] = useState('');

  const handlePreguntaChange = (e) => {
    setPregunta(e.target.value);
    setError('');
  };

  const handleOpcionChange = (index, value) => {
    const nuevasOpciones = [...opciones];
    nuevasOpciones[index] = value;
    setOpciones(nuevasOpciones);
    setError('');
  };

  const agregarOpcion = () => {
    if (opciones.length < 4) {
      setOpciones([...opciones, '']);
    }
  };

  const eliminarOpcion = (index) => {
    if (opciones.length > 2) {
      const nuevasOpciones = opciones.filter((_, i) => i !== index);
      setOpciones(nuevasOpciones);
    }
  };

  const validarFormulario = () => {
    if (!pregunta.trim()) {
      setError('La pregunta no puede estar vacía');
      return false;
    }

    const opcionesValidas = opciones.filter(opcion => opcion.trim() !== '');
    if (opcionesValidas.length < 2) {
      setError('Debes ingresar al menos 2 opciones');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validarFormulario()) {
      return;
    }

    try {
      const response = await fetch('/api/encuestas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pregunta,
          opciones: opciones.filter(opcion => opcion.trim() !== '')
        }),
      });

      if (!response.ok) {
        throw new Error('Error al crear la encuesta');
      }

      const data = await response.json();
      setCodigoUnico(data.codigo);
      setPregunta('');
      setOpciones(['', '']);
      setError('');
    } catch (error) {
      setError('Error al crear la encuesta. Por favor, intenta de nuevo.');
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-20 col-lg-14 col-xl-10">
          <div className="card shadow" style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div className="card-body p-5">
              <h2 className="text-center mb-4">Crear Nueva Encuesta</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="pregunta" className="form-label">Pregunta:</label>
                  <textarea
                    className="form-control"
                    id="pregunta"
                    value={pregunta}
                    onChange={handlePreguntaChange}
                    placeholder="Ingresa tu pregunta"
                    rows={1}
                    style={{ resize: 'none', overflow: 'hidden' }}
                    onInput={e => {
                      e.target.style.height = 'auto';
                      e.target.style.height = e.target.scrollHeight + 'px';
                    }}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">Opciones:</label>
                  {opciones.map((opcion, index) => (
                    <div key={index} className="input-group mb-2">
                      <input
                        type="text"
                        className="form-control"
                        value={opcion}
                        onChange={(e) => handleOpcionChange(index, e.target.value)}
                        placeholder={`Opción ${index + 1}`}
                      />
                      {opciones.length > 2 && (
                        <button
                          type="button"
                          onClick={() => eliminarOpcion(index)}
                          className="btn btn-danger"
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {opciones.length < 4 && (
                  <button
                    type="button"
                    onClick={agregarOpcion}
                    className="btn btn-success w-100 mb-4"
                  >
                    <i className="bi bi-plus-circle me-2"></i>
                    Agregar Opción
                  </button>
                )}

                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}
                
                {codigoUnico && (
                  <div className="alert alert-success mb-4" role="alert">
                    <h4 className="alert-heading">¡Encuesta creada exitosamente!</h4>
                    <p className="mb-0">Código único: <strong>{codigoUnico}</strong></p>
                  </div>
                )}

                <button type="submit" className="btn btn-primary w-100">
                  Crear Encuesta
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrearEncuesta; 
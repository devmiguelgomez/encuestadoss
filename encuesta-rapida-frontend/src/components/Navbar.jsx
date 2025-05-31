import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [codigo, setCodigo] = useState('');
  const [inputFocus, setInputFocus] = useState(false);
  const [copiado, setCopiado] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (codigo.trim()) {
      navigate(`/encuesta/${codigo.trim()}`);
      setCodigo('');
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4 sticky-top shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <i className="bi bi-bar-chart-fill fs-4"></i>
          Encuestas Rápidas
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link${location.pathname === '/' ? ' active' : ''}`} to="/">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link${location.pathname === '/crear' ? ' active' : ''}`} to="/crear">Crear Encuesta</Link>
            </li>
          </ul>
          <form className="d-flex align-items-center gap-2" onSubmit={handleSubmit}>
            <div className={`input-group${inputFocus ? ' shadow' : ''}`} style={{ transition: 'box-shadow 0.2s' }}>
              <span className="input-group-text bg-white"><i className="bi bi-key"></i></span>
              <input
                className="form-control"
                type="text"
                placeholder="Ingresa código para votar"
                value={codigo}
                onChange={e => setCodigo(e.target.value)}
                onFocus={() => setInputFocus(true)}
                onBlur={() => setInputFocus(false)}
                maxLength={10}
              />
            </div>
            <button className="btn btn-light d-flex align-items-center gap-1" type="submit">
              <i className="bi bi-send"></i> Votar
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 
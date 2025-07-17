import React, { useState } from 'react';
import './Configuracion.css';
import Sidebar from './SidebarAdm';
import { FaBars, FaSignOutAlt, FaArrowLeft } from 'react-icons/fa';
import { FiUser } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

function Configuracion({ onLogout }) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [urlZeus, setUrlZeus] = useState('');
  const [token, setToken] = useState('');
  const [emailServidor, setEmailServidor] = useState('');
  const [puertoSMTP, setPuertoSMTP] = useState('');
  const navigate = useNavigate();

  const mostrarMensaje = (texto) => {
    setMensaje(texto);
    setTimeout(() => setMensaje(''), 3000);
  };

  const guardarIntegraciones = () => {
    // Aquí podrías conectar con API si es necesario
    mostrarMensaje('Integraciones guardadas correctamente');
  };

  const guardarNotificaciones = () => {
    mostrarMensaje('Notificaciones guardadas correctamente');
  };

  return (
    <div className="ConfigDas">
      <div className="header">
        <button className="menu-toggle" onClick={() => setMenuVisible(!menuVisible)}><FaBars /></button>
        <img src="/logo-csa.png" alt="CSA" className="logo-small" />
        <div className="profile-section">
          <button className="back-btn" onClick={() => navigate('/')}>
            <FaArrowLeft style={{ marginRight: '8px' }} />
          </button>
          <FiUser className="profile-icon" />
          <button className="logout-btn" onClick={onLogout}><FaSignOutAlt /></button>
        </div>
      </div>

      <Sidebar visible={menuVisible} />

      <div className="contentConfig">
        <h2>Configuración del Sistema</h2>
      </div>

      {mensaje && <div className="mensaje-exito">{mensaje}</div>}

      <div className="form-section">
        <h3>Integraciones</h3>
        <label>Url Zeus/ZeusApi</label>
        <input
          type="text"
          value={urlZeus}
          onChange={(e) => setUrlZeus(e.target.value)}
          placeholder="https://ejemplo.com/zeusapi"
        />

        <label>Token</label>
        <input
          type="text"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Token de autenticación"
        />

        <button className="crear-btn" onClick={guardarIntegraciones}>Guardar</button>
      </div>

      <div className="form-section">
        <h3>Notificaciones</h3>
        <label>Email servidor</label>
        <input
          type="email"
          value={emailServidor}
          onChange={(e) => setEmailServidor(e.target.value)}
          placeholder="correo@dominio.com"
        />

        <label>Puerto SMTP</label>
        <input
          type="number"
          value={puertoSMTP}
          onChange={(e) => setPuertoSMTP(e.target.value)}
          placeholder="587"
        />

        <button className="crear-btn" onClick={guardarNotificaciones}>Guardar</button>
      </div>
    </div>
  );
}

export default Configuracion;

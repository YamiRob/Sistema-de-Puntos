import React, { useState } from 'react';
import './Puntos.css';
import Sidebar from './SidebarAdm';
import { FaBars, FaSignOutAlt, FaArrowLeft } from 'react-icons/fa';
import { FiUser } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

function Puntos({ onLogout }) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [tab, setTab] = useState('limites');
  const [limiteMensual, setLimiteMensual] = useState('');
  const [limiteCanje, setLimiteCanje] = useState('');
  const [diasInactividad, setDiasInactividad] = useState('');
  const [notificarDias, setNotificarDias] = useState('');
  const [mensaje, setMensaje] = useState('');

  const navigate = useNavigate();

  const mostrarMensaje = (texto) => {
    setMensaje(texto);
    setTimeout(() => setMensaje(''), 3000);
  };

  const actualizarLimites = () => {
    // Aquí podrías llamar a tu API si lo deseas
    mostrarMensaje('Límites actualizados correctamente');
  };

  const actualizarPoliticas = () => {
    mostrarMensaje('Políticas actualizadas correctamente');
  };

  return (
    <div className="puntosDas">
      <div className="header">
        <button className="menu-toggle" onClick={() => setMenuVisible(!menuVisible)}><FaBars /></button>
        <img src="/logo-csa.png" alt="CSA" className="logo-small" />
        <div className="profile-section">
          <button className="back-btn" onClick={() => navigate('/')}> <FaArrowLeft style={{ marginRight: '8px' }} /></button>
          <FiUser className="profile-icon" />
          <button className="logout-btn" onClick={onLogout}><FaSignOutAlt /></button>
        </div>
      </div>

      <Sidebar visible={menuVisible} />

      <div className="contentPun">
        <h2>Gestión de Puntos</h2>
      </div>

      <div className="product-tabs">
        <button
          className={tab === 'limites' ? 'tab-btn active' : 'tab-btn'}
          onClick={() => setTab('limites')}
        >
          Configuración de Límites
        </button>
        <button
          className={tab === 'expiracion' ? 'tab-btn active' : 'tab-btn'}
          onClick={() => setTab('expiracion')}
        >
          Políticas de Expiración
        </button>
      </div>

      {mensaje && (
        <div className="mensaje-exito">
          {mensaje}
        </div>
      )}

      {tab === 'limites' && (
        <div className="form-section">
          <label>Límite mensual por usuario</label>
          <input
            type="number"
            value={limiteMensual}
            onChange={(e) => setLimiteMensual(e.target.value)}
          />

          <label>Límite de Canje por Transacción</label>
          <input
            type="number"
            value={limiteCanje}
            onChange={(e) => setLimiteCanje(e.target.value)}
          />

          <button className="crear-btn" onClick={actualizarLimites}>Actualizar Límites</button>
        </div>
      )}

      {tab === 'expiracion' && (
        <div className="form-section">
          <label>Días de Inactividad para expiración</label>
          <input
            type="number"
            value={diasInactividad}
            onChange={(e) => setDiasInactividad(e.target.value)}
          />

          <label>Notificar Antes de Expirar</label>
          <input
            type="number"
            value={notificarDias}
            onChange={(e) => setNotificarDias(e.target.value)}
          />

          <button className="crear-btn" onClick={actualizarPoliticas}>Actualizar Políticas</button>
        </div>
      )}
    </div>
  );
}

export default Puntos;

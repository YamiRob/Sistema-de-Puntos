import React from 'react';
import './Sidebar.css';
import { FaBell, FaGift, FaHistory } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Sidebar({ visible }) {
  const navigate = useNavigate();

  return (
    <div className={`sidebar ${visible ? 'visible' : ''}`}>
      <h2>Recompensas</h2>
      <button onClick={() => navigate('/notificaciones')}><FaBell /> Notificaciones</button>
      <button onClick={() => navigate('/catalogo')}><FaGift /> Catálogo</button>
      <button onClick={() => navigate('/historial')}><FaHistory /> Historial</button>
    </div>
  );
}

export default Sidebar;

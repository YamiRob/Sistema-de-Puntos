import React from 'react';
import './Sidebar.css';
import { FaBell, FaBoxOpen, FaGift, FaHistory, FaStar, FaTools } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function SidebarAdm({ visible }) {
  const navigate = useNavigate();

  return (
    <div className={`sidebar ${visible ? 'visible' : ''}`}>
      <h2>Recompensas</h2>
      <button onClick={() => navigate('/notificacionesAdm')}><FaBell /> Notificaciones</button>
      <button onClick={() => navigate('/gestionUsuarios')}><FaGift /> Gestion de Usuario</button>
      <button onClick={() => navigate('/productos')}><FaBoxOpen /> Productos</button>
      <button onClick={() => navigate('/puntos')}><FaStar /> Puntos</button>
      <button onClick={() => navigate('/configuracion')}><FaTools /> Configuración</button>
    </div>
  );
}

export default SidebarAdm;
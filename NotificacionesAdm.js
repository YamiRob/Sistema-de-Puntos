import React, { useState } from 'react'; 
import './NotificacionesAdm.css';
import Sidebar from './SidebarAdm';
import { FaBars, FaSignOutAlt, FaArrowLeft, FaCommentAlt } from 'react-icons/fa';
import { FiUser } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

function NotificacionesAdm({ onLogout }) {
  const [menuVisible, setMenuVisible] = useState(false);
  const navigate = useNavigate(); 

  return (
    <div className="notiAdmdash">
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

      <div className="contentNot">
        <h2>Notificaciones</h2>
      </div>
        <div className="noti-section">
          <h3>Nuevo</h3>
          <div className="noti-card">
            <FaCommentAlt className="noti-icon" />
            <div>
              <strong>Catalogo</strong>
              <p>Nuevo artículo arreglado recientemente</p>
            </div>
          </div>
        </div>

        <div className="noti-section">
          <h3>Anteriores</h3>
          <div className="noti-card">
            <FaCommentAlt className="noti-icon" />
            <div>
              <strong>Recordatorio</strong>
              <p>Has usado 500 puntos</p>
            </div>
          </div>
        </div>
      
    </div>
  );
}

export default NotificacionesAdm;



import React, { useState } from 'react';
import './DashboardAdm.css';
import Sidebar from './SidebarAdm';
import { FaBars, FaSignOutAlt } from 'react-icons/fa';
import { FiUser } from 'react-icons/fi';
import { FaUsers, FaBoxOpen, FaStar, FaShieldAlt } from 'react-icons/fa';

function DashboardAdm({ onLogout }) {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <div className="dashboardAdm">
      <div className="header">
        <button className="menu-toggle" onClick={() => setMenuVisible(!menuVisible)}><FaBars /></button>
        <img src="/logo-csa.png" alt="CSA" className="logo-small" />
        <div className="profile-section">
          <FiUser className="profile-icon" />
          <button className="logout-btn" onClick={onLogout}><FaSignOutAlt /></button>
        </div>
      </div>

      <Sidebar visible={menuVisible} />

      <div className="content">
        <h2>¡Hola, Administrativ01!</h2>
      </div>

        <div className="cards">
          <div className="card">
            <FaUsers className="card-icon" />
            <div>
              <p>Usuarios Totales</p>
              <strong>157</strong>
            </div>
          </div>
          <div className="card">
            <FaBoxOpen className="card-icon" />
            <div>
              <p>Productos</p>
              <strong>24</strong>
            </div>
          </div>
          <div className="card">
            <FaStar className="card-icon" />
            <div>
              <p>Puntos totales</p>
              <strong>55,000</strong>
            </div>
          </div>
        </div>

        <div className="status-box">
          <h3><FaShieldAlt /> Estado del sistema</h3>
          <div className="status-bar">
            <span>Base de Datos</span>
            <span className="badge blue">Activo</span>
          </div>
          <div className="status-bar">
            <span>ZEUS</span>
            <span className="badge blue">Conectado</span>
          </div>
          <div className="status-bar">
            <span>Microsip</span>
            <span className="badge blue">Sincronizado</span>
          </div>
        </div>
      
    </div>
  );
}

export default DashboardAdm;

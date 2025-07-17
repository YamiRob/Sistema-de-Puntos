
import React, { useState } from 'react';
import './Historia.css';
import Sidebar from './Sidebar';
import { FaBars, FaSignOutAlt } from 'react-icons/fa';
import { FiUser } from 'react-icons/fi';
import { LuTrendingUp } from "react-icons/lu"; 

function Historial({ onLogout }) {
  const [menuVisible, setMenuVisible] = useState(false);

  const transacciones = [
    { id: 1, descripcion: "Canje: Auriculares", fecha: "28/05/2025" },
    { id: 2, descripcion: "Canje: Laptop HP", fecha: "09/03/2025" },
  ];

  return (
    <div className="historial-page">
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
        <h2>Historial de Transacciones</h2>
      </div>
        <div className="historial-box">
          {transacciones.map((item) => (
            <div key={item.id} className="transaccion-card">
              <LuTrendingUp className="icono" />
              <div>
                <strong>{item.descripcion}</strong>
                <p>{item.fecha}</p>
              </div>
            </div>
          ))}
        </div>
      
    </div>
  );
}

export default Historial;

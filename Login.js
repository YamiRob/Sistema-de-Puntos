import React from 'react';
import './Login.css';
import { FaUser, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
  const navigate = useNavigate();

  const handleLogin = () => {
    const username = document.querySelector('input[type="text"]').value;
    const password = document.querySelector('input[type="password"]').value;

    // 🔸 Simulación de verificación (reemplaza por verificación real después)
    const role = username === 'admin' ? 'admin' : 'cliente';

    onLogin(role);  // ✅ Pasamos el rol
    navigate('/', { replace: true });
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img src="/logo-csa.png" alt="CSA Consultores" className="logo" />
        <div className="input-group">
          <FaUser className="icon" />
          <input type="text" placeholder="Usuario" />
        </div>
        <div className="input-group">
          <FaLock className="icon" />
          <input type="password" placeholder="Contraseña" />
        </div>
        <button className="login-btn" onClick={handleLogin}>Iniciar sesión</button>
      </div>
    </div>
  );
}

export default Login;

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { FaBars, FaArrowLeft, FaSignOutAlt } from 'react-icons/fa';
import { FiUser } from 'react-icons/fi';
import './ConfirmarCompra.css';

function ConfirmarCompra({ onLogout }) {
  const { state } = useLocation();
  const producto = state?.producto;
  const [metodoPago, setMetodoPago] = useState('');
  const [confirmado, setConfirmado] = useState(false);
  const navigate = useNavigate();
  const [menuVisible, setMenuVisible] = React.useState(false);
    

  if (!producto) {
    return (
      <div>
        <p>No se seleccionó ningún producto.</p>
        <button onClick={() => navigate('/')}>Volver al catálogo</button>
      </div>
    );
  }

  const handleConfirmar = () => {
    if (!metodoPago) {
      alert('Por favor selecciona un método de pago.');
      return;
    }
    setConfirmado(true);
  };

  return (
        <div className="confirm-page">
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



    <div className="compra-container">
      <h2>Confirmar Compra</h2>

      <div className="producto-detalle">
        <img className='imgCom' src={producto.imagen} alt={producto.nombre} />
        <div>
          <h3>{producto.nombre}</h3>
          <p>{producto.descripcion}</p>
          <p><strong>Puntos:</strong> {producto.puntos}</p>
          <p><strong>Dinero:</strong> ${producto.precio}</p>
        </div>
      </div>

      <div className="metodo-pago">
        <h4>Método de Pago:</h4>
        <label>
          <input
            type="radio"
            value="transferencia"
            checked={metodoPago === 'transferencia'}
            onChange={() => setMetodoPago('transferencia')}
          />
          Transferencia Bancaria
        </label>
        <label>
          <input
            type="radio"
            value="efectivo"
            checked={metodoPago === 'efectivo'}
            onChange={() => setMetodoPago('efectivo')}
          />
          Efectivo
        </label>
      </div>

      <div className="resumen-compra">
        <h4>Resumen</h4>
        <p>Puntos a usar: {producto.puntos}</p>
        <p>Dinero a pagar: ${producto.precio}</p>
      </div>

      <button className="btn-confirmar" onClick={handleConfirmar}>
        Confirmar
      </button>

      {confirmado && (
        <div className="modal-cotizacion">
          <h3>Puntos confirmados</h3>
          <p>Se te hara llegar una cotizacion con los datos de tu compra para que puedas realizar el monto restante.</p>
          <p>Producto: {producto.nombre}</p>
          <p>Puntos usados: {producto.puntos}</p>
          <p>Dinero a pagar: ${producto.precio}</p>
          <p>Método de pago: {metodoPago}</p>
          <p>Estado: <strong>Pendiente de pago</strong></p>
          <button onClick={() => navigate('/catalogo')}>Volver al catálogo</button>
        </div>
      )}
    </div>
    </div>
  );
}

export default ConfirmarCompra;


import React from 'react';
import './Catalogo.css';
import Sidebar from './Sidebar';
import { FaBars, FaArrowLeft, FaSignOutAlt } from 'react-icons/fa';
import { FiUser } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const productos = [
  {
    id: 1,
    nombre: 'Laptop HP',
    descripcion: 'Perfecta para trabajo y entrenamiento',
    puntos: 5000,
    precio: 1500,
    imagen: '/cat1.jpg',
  },
  {
    id: 2,
    nombre: 'Celular Samsung',
    descripcion: 'Último modelo con tecnología avanzada',
    puntos: 5000,
    precio: 1500,
    imagen: '/cat2.png',
  },
  {
    id: 3,
    nombre: 'Impresora HP',
    descripcion: 'Impresora multifuncional',
    puntos: 5000,
    precio: 1500,
    imagen: '/cat3.jpg',
  },
];

function Catalogo({ onLogout }) {
  const [menuVisible, setMenuVisible] = React.useState(false);
  const navigate = useNavigate(); 

  return (
    <div className="catalogo-page">
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

      <div className="content">
        <h2>Catálogo de Productos</h2>
      </div>
        <div className="grid-container">
          {productos.map((producto) => (
            <div className="product-card" key={producto.id}>
              <img src={producto.imagen} alt={producto.nombre} />
              <h3>{producto.nombre}</h3>
              <p>{producto.descripcion}</p>
              <p>⭐ {producto.puntos} + ${producto.precio}</p>
              <button className="buy-button"
                  onClick={() => navigate('/confirmar-compra', { state: { producto } })}
              > Comprar 
              </button>
            </div>
          ))}
        </div>
      
    </div>
  );
}

export default Catalogo;


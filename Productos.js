import React, { useState } from 'react';
import './Productos.css';
import Sidebar from './SidebarAdm';
import { FaBars, FaSignOutAlt, FaArrowLeft, FaBox, FaEdit, FaTrash } from 'react-icons/fa';
import { FiUser } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

function Productos({ onLogout }) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [vista, setVista] = useState('agregar');
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: '',
    descripcion: '',
    puntos: '',
    stock: '',
    monto: '',
    imagen: null,
  });
  const [vistaPrevia, setVistaPrevia] = useState(null);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [indexEditando, setIndexEditando] = useState(null);
  const [mensaje, setMensaje] = useState('');

  const navigate = useNavigate();

  const mostrarMensaje = (texto) => {
    setMensaje(texto);
    setTimeout(() => setMensaje(''), 3000);
  };

  const crearProducto = () => {
    const productoData = {
      ...nuevoProducto,
      puntos: parseInt(nuevoProducto.puntos),
      stock: parseInt(nuevoProducto.stock),
      monto: parseInt(nuevoProducto.monto),
    };

    if (modoEdicion) {
      const copia = [...productos];
      copia[indexEditando] = productoData;
      setProductos(copia);
      setModoEdicion(false);
      setIndexEditando(null);
      mostrarMensaje('Producto actualizado correctamente');
    } else {
      setProductos([...productos, productoData]);
      mostrarMensaje('Nuevo producto agregado');
    }

    setNuevoProducto({ nombre: '', descripcion: '', puntos: '', stock: '', monto: '', imagen: null });
    setVistaPrevia(null);
  };

  setTimeout(() => {
  setMensaje('');
}, 3000);

  const cancelarEdicion = () => {
    setModoEdicion(false);
    setIndexEditando(null);
    setNuevoProducto({ nombre: '', descripcion: '', puntos: '', stock: '', monto: '', imagen: null });
    setVistaPrevia(null);
  };

  const eliminarProducto = (index) => {
    if (window.confirm('¿Estás seguro de eliminar este Producto?')) {
    const filtrados = productos.filter((_, i) => i !== index);
    setProductos(filtrados);
    }
  };

  const editarProducto = (index) => {
    const prod = productos[index];
    setNuevoProducto(prod);
    setVistaPrevia(prod.imagen ? URL.createObjectURL(prod.imagen) : null);
    setModoEdicion(true);
    setVista('agregar');
    setIndexEditando(index);
  };

  return (
    <div className="ProdBar">
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

      <div className="contentPro">
        <h2 style={{ margin: 0 }}>Gestión de Productos</h2>
        <span className="product-counter">
          <FaBox style={{ marginRight: '8px' }} /> {productos.length} Productos
        </span>
      </div>

      <div className="product-tabs">
        <button className={vista === 'agregar' ? 'tab-btn active' : 'tab-btn'} onClick={() => { setVista('agregar'); setModoEdicion(false); }}>
          Agregar Producto
        </button>
        <button className={vista === 'existentes' ? 'tab-btn active' : 'tab-btn'} onClick={() => setVista('existentes')}>
          Productos Existentes
        </button>
      </div>

      {mensaje && (
        <div className="mensaje-exito">
          {mensaje}
        </div>
      )}

      {vista === 'agregar' && (
        <div className="form-section">
          <label>Nombre del Producto</label>
          <input
            type="text"
            placeholder="Nombre del Producto"
            value={nuevoProducto.nombre}
            onChange={(e) => setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })}
          />
          <label>Descripción</label>
          <input
            type="text"
            placeholder="Descripción"
            value={nuevoProducto.descripcion}
            onChange={(e) => setNuevoProducto({ ...nuevoProducto, descripcion: e.target.value })}
          />
          <div className="puntos-group">
            <div>
              <label>Puntos Requeridos</label>
              <input
                type="number"
                value={nuevoProducto.puntos}
                onChange={(e) => setNuevoProducto({ ...nuevoProducto, puntos: e.target.value })}
              />
            </div>
            <div>
              <label>Stock</label>
              <input
                type="number"
                value={nuevoProducto.stock}
                onChange={(e) => setNuevoProducto({ ...nuevoProducto, stock: e.target.value })}
              />
            </div>
            <div>
              <label>Monto en pesos</label>
              <input
                type="number"
                value={nuevoProducto.monto}
                onChange={(e) => setNuevoProducto({ ...nuevoProducto, monto: e.target.value })}
              />
            </div>
          </div>
          <label>Imagen del Producto</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setNuevoProducto({ ...nuevoProducto, imagen: file });
                setVistaPrevia(URL.createObjectURL(file));
              }
            }}
          />

          {vistaPrevia && (
            <img
              src={vistaPrevia}
              alt="Vista previa"
              style={{ width: '150px', borderRadius: '10px', marginTop: '10px' }}
            />
          )}

          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="crear-btn" onClick={crearProducto}>
              {modoEdicion ? 'Actualizar Producto' : 'Crear Producto'}
            </button>
            {modoEdicion && (
              <button className="crear-btn" style={{ backgroundColor: '#dc3545' }} onClick={cancelarEdicion}>Cancelar</button>
            )}
          </div>
        </div>
      )}

      {vista === 'existentes' && (
        <div className="productos-list">
          {productos.map((prod, index) => (
            <div className="producto-card" key={index}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {prod.imagen && (
                  <img
                    src={URL.createObjectURL(prod.imagen)}
                    alt="Producto"
                    style={{ width: '50px', height: '50px', borderRadius: '8px' }}
                  />
                )}
                <div>
                  <strong>{prod.nombre}</strong>
                  <p>☆ {prod.puntos} puntos</p>
                </div>
              </div>
              <span>$ {prod.monto} en pesos</span>
              <span>{prod.stock} en stock</span>
              <div className="acciones">
                <button onClick={() => editarProducto(index)}><FaEdit /></button>
                <button onClick={() => eliminarProducto(index)} style={{ color: 'red' }}><FaTrash /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Productos;


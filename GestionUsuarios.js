// GestionUsuarios.js
import React, { useState } from 'react';
import './GestionUsuarios.css';
import Sidebar from './SidebarAdm';
import { FaBars, FaArrowLeft, FaUserEdit, FaSignOutAlt, FaUserPlus, FaSearch, FaTrash } from 'react-icons/fa';
import { FiUser } from 'react-icons/fi';

import { useNavigate } from 'react-router-dom';

const usuariosEjemplo = [
  { nombre: 'Administrativ01', email: 'admin@empresa.com', rol: 'Administrador', estado: 'Activo' },
  { nombre: 'Administrativ02', email: 'admin2@empresa.com', rol: 'Administrador', estado: 'Activo' },
  { nombre: 'Usuario01', email: 'cliente@empresa.com', rol: 'cliente', estado: 'Activo' },
  { nombre: 'Usuario02', email: 'cliente2@empresa.com', rol: 'cliente', estado: 'Activo' },
  { nombre: 'Usuario03', email: 'cliente@empresa.com', rol: 'cliente', estado: 'Activo' },
];

function GestionUsuarios({ onLogout }) {
  const [menuVisible, setMenuVisible] = useState(false);
  const navigate = useNavigate(); 

  const [usuarios, setUsuarios] = useState(usuariosEjemplo);
  const [busqueda, setBusqueda] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [form, setForm] = useState({ nombre: '', email: '', rol: 'cliente', estado: 'Activo' });
  const [usuarioEditando, setUsuarioEditando] = useState(null);

  const filtrados = usuarios.filter((u) =>
    u.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    u.email.toLowerCase().includes(busqueda.toLowerCase())
  );

  const abrirCrear = () => {
    setForm({ nombre: '', email: '', rol: 'cliente', estado: 'Activo' });
    setModoEdicion(false);
    setShowForm(true);
  };

  const abrirEditar = (usuario, index) => {
    setForm(usuario);
    setModoEdicion(true);
    setUsuarioEditando(index);
    setShowForm(true);
  };

  const guardarUsuario = () => {
    if (modoEdicion) {
      const nuevos = [...usuarios];
      nuevos[usuarioEditando] = form;
      setUsuarios(nuevos);
    } else {
      setUsuarios([...usuarios, form]);
    }
    setShowForm(false);
  };

  const eliminarUsuario = (index) => {
    if (window.confirm('¿Estás seguro de eliminar este usuario?')) {
      const nuevos = usuarios.filter((_, i) => i !== index);
      setUsuarios(nuevos);
    }
  };

  return (
    <div className="usuAdm">
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


      <div className="gestion-title">
        <h2>Gestión de Usuarios</h2>
      </div>

      <div className="busqueda-section">
        <div className="search-box">
          <FaSearch className="icon" />
          <input
            type="text"
            placeholder="Buscar"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
        <button className="crear-btnUse" onClick={abrirCrear}><FaUserPlus /> Crear Usuario</button>
      </div>

      <div className="lista-usuarios">
        <h3><FaUserPlus className="icon-title" /> Lista de Usuarios</h3>
        {filtrados.map((usuario, index) => (
          <div className="usuario-card" key={index}>
            <div className="avatar-card"></div>
            <div className="info-usuario">
              <strong>{usuario.nombre}</strong>
              <p>{usuario.email}</p>
            </div>
            <div className="rol">{usuario.rol}</div>
            <div className="estado">{usuario.estado}</div>
            <div className="acciones">
              <button onClick={() => abrirEditar(usuario, index)}><FaUserEdit /></button>
              <button onClick={() => eliminarUsuario(index)} style={{ color: 'red' }}><FaTrash /></button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <h3>{modoEdicion ? 'Editar Usuario' : 'Crear Usuario'}</h3>
            <input
              type="text"
              placeholder="Nombre"
              value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            />
            <input
              type="email"
              placeholder="Correo"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <select
              value={form.rol}
              onChange={(e) => setForm({ ...form, rol: e.target.value })}
            >
              <option value="cliente">Cliente</option>
              <option value="Administrador">Administrador</option>
            </select>
            <div className="modal-buttons">
              <button onClick={guardarUsuario}>Guardar</button>
              <button onClick={() => setShowForm(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GestionUsuarios;

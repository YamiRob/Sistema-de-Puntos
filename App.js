import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';

//Rol Cliente
import Login from './Login';
import Dashboard from './Dashboard';
import Notificaciones from './Notificaciones';
import Catalogo from './Catalogo';
import ConfirmarCompra from './ConfirmarCompra';
import Historial from './Historial';


//Rol Administrativo
import DashboardAdm from './DashboardAdm';
import NotificacionesAdm from './NotificacionesAdm';
import GestionUsuarios from './GestionUsuarios';
import Productos from './Productos';
import Puntos from './Puntos';
import Configuracion from './Configuracion';


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [firstLogin, setFirstLogin] = useState(false);
  const [userRole, setUserRole] = useState(null); // 👈 nuevo estado

  return (
    <Router>
      <AppRoutes
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
        firstLogin={firstLogin}
        setFirstLogin={setFirstLogin}
        userRole={userRole}
        setUserRole={setUserRole}
      />
    </Router>
  );
}

function AppRoutes({ loggedIn, setLoggedIn, firstLogin, setFirstLogin, userRole, setUserRole }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn && firstLogin) {
      navigate('/', { replace: true });
      setFirstLogin(false);
    }
  }, [loggedIn, firstLogin, navigate]);

  const handleLogin = (role) => {
    setLoggedIn(true);
    setFirstLogin(true);
    setUserRole(role); // 👈 GUARDAMOS EL ROL
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUserRole(null); // 👈 Reiniciamos el rol al cerrar sesión
  };

  return (
    <Routes>
  {!loggedIn ? (
    <Route path="*" element={<Login onLogin={handleLogin} />} />
  ) : (
    <>
      <Route
        path="/"
        element={
          userRole === 'admin'
            ? <DashboardAdm onLogout={handleLogout} />
            : <Dashboard onLogout={handleLogout} />
        }
      />
      <Route path="/notificaciones" element={<Notificaciones onLogout={handleLogout} userRole={userRole} />} />
      <Route path="/catalogo" element={<Catalogo onLogout={handleLogout} />} />
      <Route path="/confirmar-compra" element={<ConfirmarCompra />} />
      <Route path="/historial" element={<Historial onLogout={handleLogout} />} />
      
      <Route path="/notificacionesAdm" element={<NotificacionesAdm onLogout={handleLogout} />} />
      <Route path="/gestionUsuarios" element={<GestionUsuarios onLogout={handleLogout} />} />
      <Route path="/productos" element={<Productos onLogout={handleLogout} />} />
      <Route path="/puntos" element={<Puntos onLogout={handleLogout} />} />
      <Route path="/configuracion" element={<Configuracion onLogout={handleLogout} />} />
    </>
  )}
</Routes>
  );
}

export default App;

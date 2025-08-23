// ✅ Usa HashRouter para deploy estático
import { HashRouter as Router, Routes, Route, NavLink, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import CodigosBarra from "../pages/CodigosBarra.jsx";
import Caja from "../pages/Caja.jsx";
import Productos from "../pages/Productos.jsx";
import Estadisticas from "../pages/Estadisticas.jsx";
import Tienda from "../pages/Tienda.jsx";
import Carrito from "../pages/Carrito";
import Pedidos from "../pages/Pedidos.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import NoEncontrados from "../pages/NoEncontrados.jsx";


export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  function handleLogout() {
    localStorage.removeItem("user");
    setUser(null);
  }

  // 🔹 Menú según rol
  function renderNav(role) {
    switch (role) {
      case "admin":
        return (
          <>
            <NavLink className="nav-link" to="/">Códigos</NavLink>
            <NavLink className="nav-link" to="/caja">Caja</NavLink>
            <NavLink className="nav-link" to="/productos">Productos</NavLink>
            <NavLink className="nav-link" to="/estadisticas">Estadísticas</NavLink>
            <NavLink className="nav-link" to="/tienda">Tienda</NavLink>
            <NavLink className="nav-link" to="/carrito">Carrito</NavLink>
            <NavLink className="nav-link" to="/pedidos">Pedidos</NavLink>
            <NavLink className="nav-link" to="/noencontrados">No Encontrados</NavLink>

          </>
        );
      case "trabajador":
        return (
          <>
            <NavLink className="nav-link" to="/">Códigos</NavLink>
            <NavLink className="nav-link" to="/productos">Productos</NavLink>
            <NavLink className="nav-link" to="/pedidos">Pedidos</NavLink>
          </>
        );
      case "user":
      default:
        return (
          <>
            <NavLink className="nav-link" to="/tienda">Tienda</NavLink>
            <NavLink className="nav-link" to="/carrito">Carrito</NavLink>
          </>
        );
    }
  }

  // 🔹 Rutas según rol
  function renderRoutes(role) {
    switch (role) {
      case "admin":
        return (
          <>
            <Route path="/" element={<CodigosBarra />} />
            <Route path="/caja" element={<Caja />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/estadisticas" element={<Estadisticas />} />
            <Route path="/tienda" element={<Tienda />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/pedidos" element={<Pedidos />} />
            <Route path="/noencontrados" element={<NoEncontrados />} />
            <Route path="*" element={<div>404</div>} />
          </>
        );
      case "trabajador":
        return (
          <>
            <Route path="/" element={<CodigosBarra />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/pedidos" element={<Pedidos />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        );
      case "user":
      default:
        return (
          <>
            <Route path="/tienda" element={<Tienda />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="*" element={<Navigate to="/tienda" />} />
          </>
        );
    }
  }

  return (
    <Router>
      {/* Navbar solo si hay usuario */}
      {user && (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <div className="container">
            <NavLink className="navbar-brand" to="/">
              Almacén 2025
            </NavLink>
            <div className="navbar-nav">
              {renderNav(user.role)}
              <button
                onClick={handleLogout}
                className="btn btn-sm btn-outline-light ms-3"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </nav>
      )}

      <div className="container py-3">
        <Routes>
          {/* Rutas públicas */}
          {!user ? (
            <>
              <Route path="/" element={<Login onLogin={setUser} />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          ) : (
            renderRoutes(user.role)
          )}
        </Routes>
      </div>
    </Router>
  );
}

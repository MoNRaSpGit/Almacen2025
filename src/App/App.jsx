// ✅ Usa HashRouter y evita nombres duplicados
import { HashRouter as Router, Routes, Route, NavLink } from "react-router-dom";

import CodigosBarra from "../pages/CodigosBarra.jsx";
import Caja from "../pages/Caja.jsx";
import Productos from "../pages/Productos.jsx";
import Estadisticas from "../pages/Estadisticas.jsx";
import Tienda from "../pages/Tienda.jsx";

export default function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="container">
          <NavLink className="navbar-brand" to="/">Almacén 2025</NavLink>
          <div className="navbar-nav">
            <NavLink className="nav-link" to="/">Códigos</NavLink>
            <NavLink className="nav-link" to="/caja">Caja</NavLink>
            <NavLink className="nav-link" to="/productos">Productos</NavLink>
            <NavLink className="nav-link" to="/estadisticas">Estadísticas</NavLink>
            <NavLink className="nav-link" to="/tienda">Tienda</NavLink>
          </div>
        </div>
      </nav>

      <div className="container py-3">
        <Routes>
          <Route path="/" element={<CodigosBarra />} />
          <Route path="/caja" element={<Caja />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/estadisticas" element={<Estadisticas />} />
          <Route path="*" element={<div>404</div>} />
          <Route path="/tienda" element={<Tienda />} />
        </Routes>
      </div>
    </Router>
  );
}

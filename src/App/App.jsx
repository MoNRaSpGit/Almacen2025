import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { HashRouter as BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import CodigosBarra from "../pages/CodigosBarra.jsx";
import Caja from "../pages/Caja.jsx";
import Estadisticas from "../pages/Estadisticas.jsx";
import Productos from "../pages/Productos.jsx";

function Navbar() {
  return (
    <nav className="navbar navbar-expand bg-dark navbar-dark">
      <div className="container">
        <NavLink to="/" className="navbar-brand">Tienda</NavLink>
        <div className="navbar-nav">
          <NavLink to="/" className="nav-link">Códigos</NavLink>
          <NavLink to="/caja" className="nav-link">Caja</NavLink>
          <NavLink to="/estadisticas" className="nav-link">Estadísticas</NavLink>
          <NavLink to="/productos" className="nav-link">Productos</NavLink>
        </div>
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<CodigosBarra />} />
        <Route path="/caja" element={<Caja />} />
        <Route path="/estadisticas" element={<Estadisticas />} />
        <Route path="/productos" element={<Productos />} />
      </Routes>
    </BrowserRouter>
  );
}

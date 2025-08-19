import { NavLink, Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext.jsx";

export default function NavBar() {
  const { cart } = useCart();
  const count = cart.items.reduce((acc, it) => acc + it.qty, 0);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container">
        <Link className="navbar-brand" to="/">Tienda2025</Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
          aria-controls="mainNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/" end className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
                Catálogo
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/codigos" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
                Códigos
              </NavLink>
            </li>
          </ul>

          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink to="/carrito" className={({ isActive }) => "nav-link d-flex align-items-center" + (isActive ? " active" : "")}>
                <span className="me-2">Carrito</span>
                <span className="badge bg-secondary">{count}</span>
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink to="/demo" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
                Demo productos
              </NavLink>
            </li>

          </ul>
        </div>
      </div>

      {/* DEBUG (borralo luego): */}
      {/* <div className="alert alert-info m-0 w-100 text-center">Navbar montada</div> */}
    </nav>
  );
}

// src/pages/Carrito.jsx
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, clearCart } from "../Store/cartSlice.js";
import { addOrder } from "../Store/ordersSlice.js";
import { Link } from "react-router-dom";

export default function Carrito() {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  function handleFinalizarCompra() {
    if (items.length === 0) return;
    dispatch(addOrder(items)); // guardar pedido
    dispatch(clearCart()); // limpiar carrito
    alert("Compra finalizada ✅");
  }

  return (
    <div className="container py-4">
      <h1>Carrito</h1>
      {items.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <>
          <ul className="list-group mb-3">
            {items.map((item) => (
              <li key={item.id} className="list-group-item d-flex justify-content-between">
                <div>
                  {item.name} (x{item.quantity})
                </div>
                <div>${(item.price * item.quantity).toFixed(2)}</div>
              </li>
            ))}
          </ul>
          <h4>Total: ${total.toFixed(2)}</h4>
          <button className="btn btn-success mt-3" onClick={handleFinalizarCompra}>
            Finalizar compra
          </button>
        </>
      )}
      <div className="mt-3">
        <Link to="/pedidos" className="btn btn-link">
          Ver pedidos
        </Link>
      </div>
    </div>
  );
}

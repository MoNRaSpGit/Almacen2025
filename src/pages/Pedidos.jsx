// src/pages/Pedidos.jsx
import { useSelector } from "react-redux";

export default function Pedidos() {
  const orders = useSelector((state) => state.orders.orders);

  return (
    <div className="container py-4">
      <h1>Pedidos</h1>
      {orders.length === 0 ? (
        <p>No hay pedidos todavía.</p>
      ) : (
        <div className="list-group">
          {orders.map((order) => (
            <div key={order.id} className="list-group-item">
              <h5>Pedido #{order.id}</h5>
              <small className="text-muted">Fecha: {order.date}</small>
              <ul className="mt-2">
                {order.items.map((item) => {
                  const price = Number(item.price) || 0; // 🔑 conversión segura
                  return (
                    <li key={item.id}>
                      {item.name} (x{item.quantity}) - ${price.toFixed(2)}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

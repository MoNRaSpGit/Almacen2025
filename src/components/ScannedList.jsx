// src/components/ScannedList.jsx
import { fmtMoney } from "../utils/money";

export default function ScannedList({ items, subtotalCents, onClear, onRemove, onCheckout }) {
  if (!items?.length) return null;

  return (
    <div className="card mt-4">
      <div className="card-header d-flex justify-content-between align-items-center">
        <strong>Lista</strong>
        <div className="d-flex align-items-center gap-3">
          <small className="text-muted">
            Ítems: {items.reduce((a, b) => a + b.qty, 0)}
          </small>
          <button className="btn btn-sm btn-outline-secondary" onClick={onClear}>
            Vaciar
          </button>
        </div>
      </div>

      <ul className="list-group list-group-flush">
        {items.map((it) => {
          const lineCents = it.priceCents * it.qty;
          return (
            <li key={it.id} className="list-group-item d-flex align-items-center">
              {/* mini imagen */}
              <div
                className="me-3 bg-body-secondary d-flex align-items-center justify-content-center"
                style={{ width: 40, height: 40, borderRadius: 6, overflow: "hidden" }}
              >
                {it.image_url ? (
                  <img
                    src={it.image_url}
                    alt={it.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    onError={(e) => { e.currentTarget.style.display = "none"; }}
                  />
                ) : (
                  <span className="placeholder-text">—</span>
                )}
              </div>

              {/* texto */}
              <div className="flex-grow-1">
                <div className="fw-medium">{it.name}</div>
                <div className="d-flex flex-wrap gap-3 small text-muted mt-1">
                  <span>Precio: <strong>{fmtMoney(it.priceCents)}</strong></span>
                  <span>Cantidad: <strong>{it.qty}</strong></span>
                </div>
              </div>

              {/* total y eliminar */}
              <div className="ms-3 d-flex align-items-center gap-3">
                <div className="fw-semibold">{fmtMoney(lineCents)}</div>
                <button
                  className="btn btn-sm btn-outline-danger"
                  title="Eliminar este producto"
                  onClick={() => onRemove?.(it.id)}
                >
                  ✕
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="card-footer d-flex justify-content-between align-items-center">
        <button className="btn btn-success" onClick={onCheckout}>
          Realizar compra
        </button>
        <div className="fs-5">
          <strong>Total: {fmtMoney(subtotalCents)}</strong>
        </div>
      </div>
    </div>
  );
}

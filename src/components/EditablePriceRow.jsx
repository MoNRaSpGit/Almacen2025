import { useState } from "react";
import { fmtMoney, toCents } from "../utils/money";

export default function EditablePriceRow({ item, onSave }) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState((item.priceCents / 100).toString());

  function handleCancel() {
    setValue((item.priceCents / 100).toString());
    setEditing(false);
  }

  function handleSave() {
    const cents = toCents(value);
    onSave?.(item.id, cents);
    setEditing(false);
  }

  return (
    <li className="list-group-item d-flex align-items-center justify-content-between">
      <div className="me-3">
        <div className="fw-medium">{item.name}</div>
        <small className="text-muted">ID: {item.id}</small>
      </div>

      {!editing ? (
        <div className="d-flex align-items-center gap-3">
          <span className="badge text-bg-light fs-6">{fmtMoney(item.priceCents)}</span>
          <button className="btn btn-sm btn-outline-primary" onClick={() => setEditing(true)}>
            Editar
          </button>
        </div>
      ) : (
        <div className="d-flex align-items-center gap-2">
          <div className="input-group input-group-sm" style={{ width: 140 }}>
            <span className="input-group-text">$</span>
            <input
              type="number"
              step="0.01"
              min="0"
              className="form-control"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <button className="btn btn-sm btn-success" onClick={handleSave}>Guardar</button>
          <button className="btn btn-sm btn-outline-secondary" onClick={handleCancel}>Cancelar</button>
        </div>
      )}
    </li>
  );
}

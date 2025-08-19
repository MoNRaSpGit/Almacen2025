import { useState } from "react";
import { fmtMoney, toCents } from "../utils/money";

export default function EditableDualPriceRow({ item, onSave }) {
  const [editing, setEditing] = useState(false);
  const [box, setBox] = useState((item.priceBoxCents / 100).toString());
  const [unit, setUnit] = useState((item.priceUnitCents / 100).toString());

  function handleCancel() {
    setBox((item.priceBoxCents / 100).toString());
    setUnit((item.priceUnitCents / 100).toString());
    setEditing(false);
  }

  function handleSave() {
    onSave?.(item.id, toCents(box), toCents(unit));
    setEditing(false);
  }

  return (
    <li className="list-group-item d-flex align-items-center justify-content-between">
      <div className="me-3">
        <div className="fw-medium">{item.name}</div>
        <small className="text-muted">ID: {item.id}</small>
      </div>

      {!editing ? (
        <div className="d-flex align-items-center gap-3 flex-wrap">
          <span className="badge text-bg-light">Caja: {fmtMoney(item.priceBoxCents)}</span>
          <span className="badge text-bg-light">Pastilla: {fmtMoney(item.priceUnitCents)}</span>
          <button className="btn btn-sm btn-outline-primary" onClick={() => setEditing(true)}>
            Editar
          </button>
        </div>
      ) : (
        <div className="d-flex align-items-center gap-2 flex-wrap">
          <div className="input-group input-group-sm" style={{ width: 160 }}>
            <span className="input-group-text">Caja $</span>
            <input
              type="number"
              step="0.01"
              min="0"
              className="form-control"
              value={box}
              onChange={(e) => setBox(e.target.value)}
            />
          </div>
          <div className="input-group input-group-sm" style={{ width: 180 }}>
            <span className="input-group-text">Pastilla $</span>
            <input
              type="number"
              step="0.01"
              min="0"
              className="form-control"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
            />
          </div>
          <button className="btn btn-sm btn-success" onClick={handleSave}>Guardar</button>
          <button className="btn btn-sm btn-outline-secondary" onClick={handleCancel}>Cancelar</button>
        </div>
      )}
    </li>
  );
}

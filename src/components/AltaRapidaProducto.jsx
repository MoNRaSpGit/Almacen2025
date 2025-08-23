import { useState } from "react";

export default function AltaRapidaProducto({ barcode, onSuccess, onCancel }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMsg(null);

    try {
      const res = await fetch("https://backalmacen2025.onrender.com/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          price,
          barcode,
          stock: 10, // valor por defecto
        }),
      });

      if (!res.ok) throw new Error("Error al crear producto");

      const data = await res.json();
      setMsg("✅ Producto creado con éxito");
      onSuccess?.(data); // avisamos al padre
    } catch (err) {
      setMsg("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card p-3 shadow-sm mt-3">
      <h5>Agregar producto nuevo</h5>
      {msg && <div className="alert alert-info py-2">{msg}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label className="form-label">Código de barras</label>
          <input
            type="text"
            className="form-control"
            value={barcode}
            disabled
          />
        </div>

        <div className="mb-2">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-2">
          <label className="form-label">Precio</label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-success" disabled={loading}>
            {loading ? "Guardando..." : "Guardar"}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

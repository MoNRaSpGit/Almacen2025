// src/pages/NoEncontrados.jsx
import { useSelector, useDispatch } from "react-redux";
import { limpiarNoEncontrados } from "../Store/noEncontradosSlice.js";
import { useState } from "react";

export default function NoEncontrados() {
  const dispatch = useDispatch();
  const lista = useSelector((state) => state.noEncontrados);

  // Estado para saber qué item estamos editando
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
  });

  function handleEdit(item) {
    setEditing(item.code);
    setFormData({ name: "", price: "", image: "" });
  }

  async function handleSave(code) {
  try {
    const res = await fetch("https://backalmacen2025.onrender.com/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.name,
        price: Number(formData.price),
        stock: 10,
        barcode: code,
        imageDataUrl: formData.image || null, // 👈 base64 si subís imagen
      }),
    });

    if (!res.ok) throw new Error("Error al guardar producto");

    const data = await res.json();
    alert(`✅ Producto guardado: ${data.name}`);

    setEditing(null);
    setFormData({ name: "", price: "", image: "" });
  } catch (err) {
    alert("❌ " + err.message);
  }
}


  return (
  <div className="container py-4">
    <h2>No encontrados</h2>
    {lista.length === 0 ? (
      <p className="text-muted">No hay productos no encontrados</p>
    ) : (
      <>
        <ul className="list-group mb-3">
          {lista.map((item, i) => (
            <li key={i} className="list-group-item">
              {editing === item.code ? (
                <div>
                  <div className="mb-2">
                    <label className="form-label">Código de barras</label>
                    <input
                      type="text"
                      className="form-control"
                      value={item.code}
                      disabled
                    />
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Nombre</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Precio</label>
                    <input
                      type="number"
                      className="form-control"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Imagen</label>
                    <input
                      type="file"
                      className="form-control"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setFormData({ ...formData, image: reader.result });
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                    {formData.image && (
                      <img
                        src={formData.image}
                        alt="preview"
                        className="mt-2"
                        style={{ maxHeight: "100px" }}
                      />
                    )}
                  </div>
                  <button
                    className="btn btn-success btn-sm me-2"
                    onClick={() => handleSave(item.code)}
                  >
                    Aceptar
                  </button>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => setEditing(null)}
                  >
                    Cancelar
                  </button>
                </div>
              ) : (
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{item.code}</strong>{" "}
                    <small className="text-muted">
                      {new Date(item.date).toLocaleString()}
                    </small>
                  </div>
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => handleEdit(item)}
                  >
                    Editar
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
        <button
          className="btn btn-outline-danger"
          onClick={() => dispatch(limpiarNoEncontrados())}
        >
          Limpiar lista
        </button>
      </>
    )}
  </div>
);

}

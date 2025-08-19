import { useState } from "react";
import { useUpdateProductImageMutation } from "../Store/productsApi";

export default function ProductCard({ product, onUpdated, onStatus }) {
  const [editing, setEditing] = useState(false);
  const [preview, setPreview] = useState(null);
  const [updateImage, { isLoading }] = useUpdateProductImageMutation();

  function onPickFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      onStatus?.({ type: "err", msg: "El archivo debe ser una imagen" });
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = String(reader.result || "");
      setPreview(dataUrl);
      console.log("[UI] preview prefix:", dataUrl.slice(0, 30));
    };
    reader.readAsDataURL(file);
  }

  async function saveImage() {
    if (!product?.id) return;
    if (!preview) {
      onStatus?.({ type: "err", msg: "Elegí una imagen antes de guardar" });
      return;
    }
    onStatus?.({ type: "info", msg: "Guardando imagen..." });
    try {
      await updateImage({ id: product.id, imageDataUrl: preview }).unwrap();
      // Actualizamos el padre con la nueva imagen (optimista)
      onUpdated?.({ ...product, image_url: preview });
      setPreview(null);
      setEditing(false);
      onStatus?.({ type: "ok", msg: "Imagen actualizada" });
    } catch (err) {
      console.error("saveImage error", err);
      onStatus?.({ type: "err", msg: "No se pudo guardar la imagen" });
    }
  }

  return (
    <div className="card mb-4">
      <div className="row g-0">
        <div className="col-12 col-sm-4">
          <div className="ratio ratio-4x3 bg-body-secondary">
            <img
              src={preview || product.image_url || ""}
              alt={product.name}
              className="object-cover w-100 h-100 rounded-start"
              onError={(e) => { e.currentTarget.src = ""; }}
            />
            {!preview && !product.image_url && (
              <div className="d-flex align-items-center justify-content-center w-100 h-100">
                <span className="placeholder-text">Sin imagen</span>
              </div>
            )}
          </div>
        </div>

        <div className="col">
          <div className="card-body">
            <h5 className="card-title mb-1">{product.name}</h5>
            <div className="text-muted mb-2">
              Código: <span className="font-monospace">{product.barcode}</span>
            </div>
            <div className="fs-5 mb-3">
              <strong>${Number(product.price || 0).toFixed(2)}</strong>
            </div>

            {!editing ? (
              <button
                className="btn btn-outline-primary btn-sm"
                onClick={() => setEditing(true)}
              >
                Editar imagen
              </button>
            ) : (
              <div className="d-flex flex-column gap-2">
                <input type="file" accept="image/*" onChange={onPickFile} />
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={saveImage}
                    disabled={isLoading}
                  >
                    {isLoading ? "Guardando..." : "Guardar"}
                  </button>
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => { setEditing(false); setPreview(null); }}
                    disabled={isLoading}
                  >
                    Cancelar
                  </button>
                </div>
                {preview && <small className="text-muted">Preview listo (base64)</small>}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

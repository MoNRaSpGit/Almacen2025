export default function ProductListItem({ product }) {
  const img = product.image_url || product.image || null;

  return (
    <div className="card h-100">
      <div className="ratio ratio-1x1 bg-body-secondary">
        {img ? (
          <img
            src={img}
            alt={product.name}
            className="object-fit-cover w-100 h-100 rounded-top"
            onError={(e) => { e.currentTarget.src = ""; }}
          />
        ) : (
          <div className="d-flex align-items-center justify-content-center w-100 h-100">
            <span className="text-muted small">Sin imagen</span>
          </div>
        )}
      </div>

      <div className="card-body">
        <div className="fw-semibold text-truncate" title={product.name}>
          {product.name}
        </div>
        <div className="text-muted small mb-2">
          {product.barcode || <span className="opacity-50">—</span>}
        </div>
        <div className="fw-bold">
          ${Number(product.price || 0).toFixed(2)}
        </div>
      </div>
    </div>
  );
}

// src/components/ProductListItem.jsx
import { useDispatch } from "react-redux";
import { addToCart } from "../Store/cartSlice.js";

export default function ProductListItem({ product }) {
  const dispatch = useDispatch();

  function handleAddToCart() {
    dispatch(addToCart(product));
  }

  return (
    <div className="card h-100 shadow-sm">
      {product.image_url ? (
        <img
          src={product.image_url}
          alt={product.name}
          className="card-img-top"
          style={{ objectFit: "cover", height: "180px" }}
        />
      ) : (
        <div
          className="d-flex align-items-center justify-content-center bg-light"
          style={{ height: "180px" }}
        >
          <span className="text-muted small">Sin imagen</span>
        </div>
      )}

      <div className="card-body text-center d-flex flex-column">
        <h5 className="card-title mb-2">{product.name}</h5>
        <p className="card-text mb-1 fw-bold">
          ${Number(product.price).toFixed(2)}
        </p>
        <p className="card-text text-muted mb-2">
          Stock: {product.stock ?? 0}
        </p>

        {/* Botón agregar a carrito */}
        <button
          className="btn btn-primary mt-auto"
          onClick={handleAddToCart}
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}

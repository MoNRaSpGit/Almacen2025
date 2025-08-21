import { useEffect, useMemo, useState } from "react";
import { useListProductsQuery } from "../Store/productsApi.js";
import ProductListItem from "../components/ProductListItem.jsx";

// mini hook para debouce del buscador
function useDebouncedValue(value, delay = 300) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setV(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return v;
}

export default function Tienda() {
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const limit = 24;

  const qDebounced = useDebouncedValue(q, 300);

  // consulta a backend (orden alfabético ya lo hace el server; si no, ordenamos abajo)
  const { data, isFetching, isError } = useListProductsQuery(
    { q: qDebounced, limit, page },
    { refetchOnMountOrArgChange: true }
  );

  // acumulador simple por página
  const [items, setItems] = useState([]);
  useEffect(() => {
    if (!isFetching && Array.isArray(data)) {
      setItems((prev) => (page === 1 ? data : [...prev, ...data]));
    }
  }, [data, isFetching, page]);

  // por si el server no ordena, lo aseguramos acá (case-insensitive)
const itemsSorted = useMemo(() => {
  return [...items].sort((a, b) => {
    const aHasImg = a.image_url ? 1 : 0;
    const bHasImg = b.image_url ? 1 : 0;

    // primero los que tienen imagen
    if (aHasImg !== bHasImg) return bHasImg - aHasImg;

    // luego orden alfabético
    return String(a.name || "").localeCompare(String(b.name || ""), "es", {
      sensitivity: "base",
    });
  });
}, [items]);


  const hasMore = Array.isArray(data) && data.length === limit;

  function onSearchChange(e) {
    setQ(e.target.value);
    setPage(1);
  }

  return (
    <div className="container py-4">
      <h1 className="h4 mb-3">Tienda</h1>

      <div className="mb-3">
        <label className="form-label">Buscar producto</label>
        <input
          type="text"
          className="form-control"
          placeholder="Ej: coca, arroz, galletitas…"
          value={q}
          onChange={onSearchChange}
        />
      </div>

      {isError && (
        <div className="alert alert-warning" role="alert">
          No se pudo cargar la lista.
        </div>
      )}

      {/* Grid de productos */}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
        {itemsSorted.map((p) => (
          <div key={p.id} className="col">
            <ProductListItem product={p} />
          </div>
        ))}
      </div>

      {/* Estados vacíos / cargando */}
      {isFetching && (
        <div className="text-center py-4">
          <div className="spinner-border" role="status" />
        </div>
      )}

      {!isFetching && itemsSorted.length === 0 && (
        <div className="text-center text-muted py-4">
          No hay productos para mostrar.
        </div>
      )}

      {/* Paginación simple “Cargar más” */}
      {!isFetching && hasMore && (
        <div className="d-flex justify-content-center py-3">
          <button
            className="btn btn-outline-primary"
            onClick={() => setPage((p) => p + 1)}
          >
            Cargar más
          </button>
        </div>
      )}
    </div>
  );
}

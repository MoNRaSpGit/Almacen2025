import { useSalesHistory } from "../hooks/useSalesHistory";
import { fmtMoney } from "../utils/money";

export default function Estadisticas() {
  const { sales, thisMonthTotalCents } = useSalesHistory();

  // Agrupar ventas por producto
  const map = new Map();
  for (const s of sales) {
    for (const l of s.lines || []) {
      const key = l.productId ?? l.barcode ?? l.name;
      const acc = map.get(key) || { id: key, name: l.name, image_url: l.image_url, qty: 0, revenueCents: 0 };
      acc.qty += Number(l.qty || 0);
      acc.revenueCents += Number(l.priceCents || 0) * Number(l.qty || 0);
      map.set(key, acc);
    }
  }
  const top = Array.from(map.values()).sort((a,b) => b.qty - a.qty).slice(0, 10);

  // Cierre de mes (demo duro): comparar contra $2000.00
  const PREV_MONTH_CENTS = 200000;
  const current = thisMonthTotalCents;
  const prev = PREV_MONTH_CENTS;
  const diff = current - prev;
  const pct = prev > 0 ? (diff / prev) * 100 : (current > 0 ? 100 : 0);

  return (
    <div className="container py-4">
      <h1 className="h4 mb-3">Estadísticas</h1>

      <div className="card mb-4">
        <div className="card-header"><strong>Top productos (por cantidad)</strong></div>
        <ul className="list-group list-group-flush">
          {top.length === 0 && <li className="list-group-item text-muted">Sin ventas aún</li>}
          {top.map(p => (
            <li key={p.id} className="list-group-item d-flex align-items-center">
              <div
                className="me-3 bg-body-secondary d-flex align-items-center justify-content-center"
                style={{ width: 40, height: 40, borderRadius: 6, overflow: "hidden" }}
              >
                {p.image_url ? (
                  <img
                    src={p.image_url}
                    alt={p.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    onError={(e) => { e.currentTarget.style.display = "none"; }}
                  />
                ) : <span className="placeholder-text">—</span>}
              </div>
              <div className="flex-grow-1">
                <div className="fw-medium">{p.name}</div>
                <small className="text-muted">
                  Vendidos: <strong>{p.qty}</strong> • Ingresos: <strong>{fmtMoney(p.revenueCents)}</strong>
                </small>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="card">
        <div className="card-header"><strong>Cierre de mes (demo)</strong></div>
        <div className="card-body d-flex flex-wrap gap-3 align-items-center">
          <div>Este mes: <strong>{fmtMoney(current)}</strong></div>
          <div>Mes anterior (demo): <strong>{fmtMoney(prev)}</strong></div>
          <div>
            Variación:{" "}
            <strong className={diff >= 0 ? "text-success" : "text-danger"}>
              {diff >= 0 ? "+" : ""}{fmtMoney(Math.abs(diff))} ({pct.toFixed(1)}%)
            </strong>
          </div>
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={() => alert(`Demo cierre de mes\nEste mes: ${fmtMoney(current)}\nAnterior: ${fmtMoney(prev)}\nVariación: ${pct.toFixed(1)}%`)}
          >
            Cerrar mes (demo)
          </button>
        </div>
      </div>
    </div>
  );
}

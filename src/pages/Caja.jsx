import { useCashRegister } from "../hooks/useCashRegister";
import { fmtMoney } from "../utils/money";

export default function Caja() {
  const { totalCents, reset } = useCashRegister();

  return (
    <div className="container py-4">
      <h1 className="h4 mb-3">Caja</h1>
      <div className="card">
        <div className="card-body d-flex justify-content-between align-items-center">
          <div className="fs-4">Total acumulado: <strong>{fmtMoney(totalCents)}</strong></div>
          <button className="btn btn-outline-danger btn-sm" onClick={reset}>
            Reiniciar
          </button>
        </div>
      </div>
    </div>
  );
}

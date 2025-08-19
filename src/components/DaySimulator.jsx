import { useEffect, useState } from "react";

const KEY = "sim-day-v1"; // persistencia simple

export default function DaySimulator() {
  const [day, setDay] = useState(() => {
    try { return localStorage.getItem(KEY); } catch { return null; }
  });

  useEffect(() => {
    try {
      if (day) localStorage.setItem(KEY, day);
      else localStorage.removeItem(KEY);
    } catch {}
  }, [day]);

  return (
    <div className="mb-3">
      <div className="d-flex flex-wrap gap-2 align-items-center mb-2">
        <small className="text-muted me-2">Simular día:</small>
        <button
          className={"btn btn-sm " + (day === "martes" ? "btn-primary" : "btn-outline-primary")}
          onClick={() => setDay("martes")}
        >
          Martes
        </button>
        <button
          className={"btn btn-sm " + (day === "viernes" ? "btn-primary" : "btn-outline-primary")}
          onClick={() => setDay("viernes")}
        >
          Viernes
        </button>
        <button
          className="btn btn-sm btn-outline-secondary"
          onClick={() => setDay(null)}
        >
          Quitar simulaciónsss
        </button>
      </div>

      {day === "viernes" && (
        <div className="alert alert-info py-2" role="alert">
          <strong>Hoy es Viernes.</strong> Llega la Coca-Cola.
        </div>
      )}
      {day === "martes" && (
        <div className="alert alert-secondary py-2" role="alert">
          <strong>Hoy es Martes.</strong> Hay que actualizar las frutas y verduras.
        </div>
      )}
    </div>
  );
}

import { useEffect, useState } from "react";
import EditablePriceRow from "../components/EditablePriceRow.jsx";
import EditableDualPriceRow from "../components/EditableDualPriceRow.jsx";

// storage keys
const K_FRUTAS = "demo-frutas-v1";
const K_REMEDIOS = "demo-remedios-v1";

// listas por defecto (podés ajustar)
const DEFAULT_FRUTAS = [
  { id: 1, name: "Manzana", priceCents: 80_00 },
  { id: 2, name: "Banana",  priceCents: 80_00 },
  { id: 3, name: "Durazno", priceCents: 120_00 },
  { id: 4, name: "Naranja", priceCents: 70_00 },
  { id: 5, name: "Cebolla", priceCents: 65_00 },
  { id: 6, name: "Tomate",  priceCents: 95_00 },
];

const DEFAULT_REMEDIOS = [
  { id: 101, name: "E9000",    priceBoxCents: 120_00, priceUnitCents: 80_00 },
  { id: 102, name: "Aspirina", priceBoxCents: 210_00, priceUnitCents: 18_00 },
  { id: 103, name: "Actron",   priceBoxCents: 320_00, priceUnitCents: 28_00 },
  { id: 104, name: "Ibuprof.", priceBoxCents: 250_00, priceUnitCents: 22_00 },
];

export default function Productos() {
  const [frutas, setFrutas] = useState(() => {
    try { return JSON.parse(localStorage.getItem(K_FRUTAS) || "null") || DEFAULT_FRUTAS; }
    catch { return DEFAULT_FRUTAS; }
  });
  const [remedios, setRemedios] = useState(() => {
    try { return JSON.parse(localStorage.getItem(K_REMEDIOS) || "null") || DEFAULT_REMEDIOS; }
    catch { return DEFAULT_REMEDIOS; }
  });

  useEffect(() => {
    try { localStorage.setItem(K_FRUTAS, JSON.stringify(frutas)); } catch {}
  }, [frutas]);
  useEffect(() => {
    try { localStorage.setItem(K_REMEDIOS, JSON.stringify(remedios)); } catch {}
  }, [remedios]);

  function saveFruta(id, newPriceCents) {
    setFrutas((prev) => prev.map(f => f.id === id ? { ...f, priceCents: newPriceCents } : f));
  }

  function saveRemedio(id, newBoxCents, newUnitCents) {
    setRemedios((prev) => prev.map(r => r.id === id
      ? { ...r, priceBoxCents: newBoxCents, priceUnitCents: newUnitCents }
      : r
    ));
  }

  return (
    <div className="container py-4">
      <h1 className="h4 mb-4">Productos</h1>

      <div className="row g-4">
        {/* Frutas y verduras */}
        <div className="col-12 col-lg-6">
          <div className="card h-100">
            <div className="card-header d-flex align-items-center justify-content-between">
              <strong>Frutas y verduras</strong>
              <span className="badge text-bg-secondary">{frutas.length}</span>
            </div>
            <ul className="list-group list-group-flush">
              {frutas.map((item) => (
                <EditablePriceRow key={item.id} item={item} onSave={saveFruta} />
              ))}
            </ul>
          </div>
        </div>

        {/* Remedios */}
        <div className="col-12 col-lg-6">
          <div className="card h-100">
            <div className="card-header d-flex align-items-center justify-content-between">
              <strong>Remedios</strong>
              <span className="badge text-bg-secondary">{remedios.length}</span>
            </div>
            <ul className="list-group list-group-flush">
              {remedios.map((item) => (
                <EditableDualPriceRow key={item.id} item={item} onSave={saveRemedio} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

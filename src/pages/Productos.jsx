import { useEffect, useMemo, useState } from "react";
import EditablePriceRow from "../components/EditablePriceRow.jsx";
import EditableDualPriceRow from "../components/EditableDualPriceRow.jsx";

// storage keys
const K_FRUTAS = "demo-frutas-v1";
const K_REMEDIOS = "demo-remedios-v1";

// listas por defecto (podés ajustar)
const DEFAULT_FRUTAS = [
  { id: 1, name: "Manzana", priceCents: 80_00 /*, imageUrl: "/img/manzana.jpg"*/ },
  { id: 2, name: "Banana",  priceCents: 80_00 /*, imageUrl: "/img/banana.jpg"*/ },
  { id: 3, name: "Durazno", priceCents: 120_00 },
  { id: 4, name: "Naranja", priceCents: 70_00 },
  { id: 5, name: "Cebolla", priceCents: 65_00 },
  { id: 6, name: "Tomate",  priceCents: 95_00 },
];

const DEFAULT_REMEDIOS = [
  { id: 101, name: "E9000",    priceBoxCents: 120_00, priceUnitCents: 80_00 },
  { id: 102, name: "Aspirina", priceBoxCents: 210_00, priceUnitCents: 18_00 /*, img: "/img/aspirina.png"*/ },
  { id: 103, name: "Actron",   priceBoxCents: 320_00, priceUnitCents: 28_00 },
  { id: 104, name: "Ibuprof.", priceBoxCents: 250_00, priceUnitCents: 22_00 },
];

// Helper robusto para detectar si un item tiene imagen (soporta varios nombres de campo)
function hasImage(item) {
  const candidates = [
    item.imagen,
    item.img,
    item.image,
    item.imagenUrl,
    item.imageUrl,
    Array.isArray(item.imagenes) && item.imagenes[0],
    Array.isArray(item.images) && item.images[0],
    item.foto,
    item.fotoUrl,
  ].filter(Boolean);

  return candidates.some((v) =>
    typeof v === "string" ? v.trim().length > 0 : Boolean(v)
  );
}

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

  // ✅ Orden: primero los que tienen imagen (orden estable para no romper el orden entre iguales)
  const frutasOrdenadas = useMemo(() => {
    return frutas
      .map((it, idx) => ({ it, idx, hasImg: hasImage(it) }))
      .sort((a, b) => (a.hasImg === b.hasImg ? a.idx - b.idx : (a.hasImg ? -1 : 1)))
      .map(({ it }) => it);
  }, [frutas]);

  const remediosOrdenados = useMemo(() => {
    return remedios
      .map((it, idx) => ({ it, idx, hasImg: hasImage(it) }))
      .sort((a, b) => (a.hasImg === b.hasImg ? a.idx - b.idx : (a.hasImg ? -1 : 1)))
      .map(({ it }) => it);
  }, [remedios]);

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
              {frutasOrdenadas.map((item) => (
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
              {remediosOrdenados.map((item) => (
                <EditableDualPriceRow key={item.id} item={item} onSave={saveRemedio} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

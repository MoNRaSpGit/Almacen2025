// src/pages/CodigosBarra.jsx
import { useEffect, useRef, useState } from "react";
import { useLazyGetProductByBarcodeQuery } from "../Store/productsApi.js";
import { normalizeProduct } from "../utils/normalizeProduct.js";
import ScanInput from "../components/ScanInput.jsx";
import StatusAlert from "../components/StatusAlert.jsx";
import ProductCard from "../components/ProductCard.jsx";
import { useScannedList } from "../hooks/useScannedList.js";
import ScannedList from "../components/ScannedList.jsx";
import { useCashRegister } from "../hooks/useCashRegister";
import { useSalesHistory } from "../hooks/useSalesHistory.js";
import DaySimulator from "../components/DaySimulator.jsx";
import AltaRapidaProducto from "../components/AltaRapidaProducto.jsx";

// Redux
import { useDispatch } from "react-redux";
import { agregarNoEncontrado } from "../Store/noEncontradosSlice.js";

export default function CodigosBarra() {
  const [code, setCode] = useState("");
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState(null);
  const [noEncontradoCode, setNoEncontradoCode] = useState(null); // 👈 código no encontrado
  const inputRef = useRef(null);
  const { addSale } = useSalesHistory();

  const [fetchByBarcode, { isFetching }] = useLazyGetProductByBarcodeQuery();
  const { items, add, removeLine, clear, subtotalCents } = useScannedList();
  const { add: addToCash } = useCashRegister();

  const dispatch = useDispatch();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function isLikelyEan(code) {
    return /^\d{8}$|^\d{13}$/.test(code);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const trimmed = String(code ?? "").trim();
    if (!trimmed) return;

    if (!isLikelyEan(trimmed)) {
      setStatus({ type: "err", msg: "Código inválido (use EAN-8 o EAN-13)" });
      setCode("");
      inputRef.current?.focus();
      return;
    }

    setStatus({ type: "info", msg: `Buscando ${trimmed}...` });
    const res = await fetchByBarcode(trimmed);

    if ("data" in res && res.data) {
      const prod = normalizeProduct(res.data);
      setProduct(prod);
      setNoEncontradoCode(null); // limpiamos formulario
      setStatus({ type: "ok", msg: `Encontrado: ${prod.name} — ${prod.barcode}` });
      add(prod);
    } else {
      setProduct(null);
      setStatus({ type: "err", msg: `No encontrado: ${trimmed}` });

      // Guardamos en Redux la lista de no encontrados
      dispatch(agregarNoEncontrado(trimmed));

      // mostramos el form de alta rápida
      setNoEncontradoCode(trimmed);
    }

    setCode("");
    inputRef.current?.focus();
  }

  function handleCheckout() {
    if (!items.length) {
      setStatus({ type: "err", msg: "No hay productos para comprar" });
      return;
    }
    addSale(items);
    addToCash(subtotalCents);
    clear();
    setProduct(null);
    setNoEncontradoCode(null);
    setStatus({ type: "ok", msg: "Compra registrada en Caja" });
    inputRef.current?.focus();
  }

  return (
    <div className="container py-4">
      <h1 className="h4 mb-3 text-center text-md-start">Lectura de código</h1>
      <DaySimulator />

      {/* Input de escaneo ocupa 100% en mobile */}
      <div className="mb-3">
        <ScanInput
          ref={inputRef}
          value={code}
          onChange={setCode}
          onSubmit={handleSubmit}
          isLoading={isFetching}
          className="w-100"
        />
      </div>

      <StatusAlert status={status} />

      {/* Producto encontrado */}
      {product && (
        <div className="mb-3">
          <ProductCard
            product={product}
            onUpdated={(p) => setProduct(p)}
            onStatus={setStatus}
          />
        </div>
      )}

      {/* Alta rápida si no lo encontramos */}
      {noEncontradoCode && (
        <div className="mb-3">
          <AltaRapidaProducto
            barcode={noEncontradoCode}
            onCancel={() => setNoEncontradoCode(null)}
            onCreated={(nuevo) => {
              setProduct(nuevo);
              setStatus({ type: "ok", msg: `Producto creado: ${nuevo.name}` });
              setNoEncontradoCode(null);
              add(nuevo);
            }}
          />
        </div>
      )}

      {/* Lista escaneada con grid responsive */}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        <ScannedList
          items={items}
          subtotalCents={subtotalCents}
          onClear={clear}
          onRemove={removeLine}
          onCheckout={handleCheckout}
        />
      </div>
    </div>
  );
}

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


export default function CodigosBarra() {
  const [code, setCode] = useState("");
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState(null);
  const inputRef = useRef(null);
  const { addSale } = useSalesHistory();

  const [fetchByBarcode, { isFetching }] = useLazyGetProductByBarcodeQuery();
  const { items, add, removeLine, clear, subtotalCents } = useScannedList();
  const { add: addToCash } = useCashRegister();
  

  useEffect(() => { inputRef.current?.focus(); }, []);

  function isLikelyEan(code) { return /^\d{8}$|^\d{13}$/.test(code); }

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
      setStatus({ type: "ok", msg: `Encontrado: ${prod.name} — ${prod.barcode}` });
      add(prod);
    } else {
      setProduct(null);
      setStatus({ type: "err", msg: `No encontrado: ${trimmed}` });
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
  addToCash(subtotalCents);   // suma a Caja (persistente)
  clear();                    // vacía la lista
  setProduct(null);           // limpia detalle actual
  setStatus({ type: "ok", msg: "Compra registrada en Caja" });
  inputRef.current?.focus();  // vuelve foco al input para seguir escaneando
}


  return (
    <div className="container py-4">
      <h1 className="h4 mb-3">Lectura de código</h1>
      <DaySimulator />

      <ScanInput
        ref={inputRef}
        value={code}
        onChange={setCode}
        onSubmit={handleSubmit}
        isLoading={isFetching}
      />

      <StatusAlert status={status} />

      {product && (
        <ProductCard
          product={product}
          onUpdated={(p) => setProduct(p)}
          onStatus={setStatus}
        />
      )}

      <ScannedList
        items={items}
        subtotalCents={subtotalCents}
        onClear={clear}
        onRemove={removeLine}
        onCheckout={handleCheckout}
      />
    </div>
  );
}

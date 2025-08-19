import { createContext, useContext, useState } from "react";

const BarcodesCtx = createContext();

export function BarcodesProvider({ children }) {
  // items: productos completos traídos del backend (id, name, price, image_url, barcode, description)
  const [items, setItems] = useState([]);

  const add = (product) =>
    setItems(prev => prev.find(p => p.barcode === product.barcode) ? prev : [product, ...prev]);

  const clear = () => setItems([]);

  return (
    <BarcodesCtx.Provider value={{ items, add, clear }}>
      {children}
    </BarcodesCtx.Provider>
  );
}

export const useBarcodes = () => useContext(BarcodesCtx);

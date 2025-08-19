// src/hooks/useScannedList.js
import { useEffect, useMemo, useState } from "react";
import { toCents } from "../utils/money";

/**
 * Mantiene la lista de productos escaneados en localStorage.
 * items: [{ id, name, barcode, image_url, qty, priceCents }]
 */
export function useScannedList(storageKey = "scanned-v1") {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // Persistencia
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(items));
    } catch {}
  }, [items, storageKey]);

  // Agregar producto (o aumentar qty si ya existe)
  function add(prod) {
    setItems((prev) => {
      const priceCents = toCents(prod.price);
      const idx = prev.findIndex((it) => it.id === prod.id);
      if (idx >= 0) {
        const copy = [...prev];
        const old = copy[idx];
        copy[idx] = { ...old, qty: old.qty + 1, priceCents };
        return copy;
      }
      return [
        ...prev,
        {
          id: prod.id,
          name: prod.name,
          barcode: prod.barcode,
          image_url: prod.image_url || null,
          qty: 1,
          priceCents,
        },
      ];
    });
  }

  // Eliminar una línea completa
  function removeLine(id) {
    setItems((prev) => prev.filter((it) => it.id !== id));
  }

  // Vaciar lista
  function clear() {
    setItems([]);
  }

  // Subtotal en centavos
  const subtotalCents = useMemo(
    () => items.reduce((sum, it) => sum + it.priceCents * it.qty, 0),
    [items]
  );

  return { items, add, removeLine, clear, subtotalCents };
}

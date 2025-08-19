import { useEffect, useMemo, useState } from "react";

const KEY = "sales-v1";

export function useSalesHistory(storageKey = KEY) {
  const [sales, setSales] = useState(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try { localStorage.setItem(storageKey, JSON.stringify(sales)); } catch {}
  }, [sales, storageKey]);

  function addSale(lines) {
    if (!lines?.length) return;
    const normalized = lines.map(l => ({
      productId: l.id,
      name: l.name,
      barcode: l.barcode,
      image_url: l.image_url || null,
      qty: Number(l.qty || 0),
      priceCents: Number(l.priceCents || 0),
    })).filter(l => l.qty > 0);
    const totalCents = normalized.reduce((sum, l) => sum + l.priceCents * l.qty, 0);
    const sale = { id: Date.now(), at: new Date().toISOString(), lines: normalized, totalCents };
    setSales(prev => [...prev, sale]);
  }

  function clearAll() { setSales([]); }

  function isSameMonth(a, b) {
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
  }

  const thisMonthTotalCents = useMemo(() => {
    const now = new Date();
    return sales.reduce((sum, s) => {
      const dt = new Date(s.at);
      return isSameMonth(now, dt) ? sum + Number(s.totalCents || 0) : sum;
    }, 0);
  }, [sales]);

  return { sales, addSale, clearAll, thisMonthTotalCents };
}

import { useEffect, useState } from "react";

export function useCashRegister(storageKey = "cash-total-v1") {
  const [totalCents, setTotalCents] = useState(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      return raw ? parseInt(raw, 10) : 0;
    } catch {
      return 0;
    }
  });

  useEffect(() => {
    try { localStorage.setItem(storageKey, String(totalCents)); } catch {}
  }, [totalCents, storageKey]);

  function add(amountCents) {
    const n = Number(amountCents || 0);
    if (!Number.isFinite(n) || n <= 0) return;
    setTotalCents((t) => t + n);
  }

  function reset() { setTotalCents(0); }

  return { totalCents, add, reset };
}

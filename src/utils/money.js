export const toCents = (v) => Math.round(Number(v || 0) * 100);
export const fromCents = (c) => (c || 0) / 100;
export const fmtMoney = (cents) => `$${fromCents(cents).toFixed(2)}`; // simple

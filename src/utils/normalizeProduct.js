export function normalizeProduct(p) {
  if (!p) return p;
  return {
    ...p,
    price: typeof p.price === "string" ? parseFloat(p.price) : p.price,
    image_url: p.image_url ?? p.image ?? null,
  };
}

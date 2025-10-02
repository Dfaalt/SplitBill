export const fmtIDR = (n) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  })
    .format(Math.round(n ?? 0))
    .replace(/\s/g, ""); // hilangkan spasi

// Fungsi pembulatan ke unit tertentu (100, 1000, dst). Jika unit=null/0, tidak perlu pembulatan
export const roundTo = (value, unit) => {
  if (!unit) return value;
  return Math.round(value / unit) * unit;
};

export const uid = () => Math.random().toString(36).slice(2, 10);

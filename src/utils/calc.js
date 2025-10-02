import { roundTo } from "./format.js"; // Import helper untuk pembulatan angka

// Fungsi utama untuk menghitung pembagian biaya
export const computeBreakdown = (members, items, charges, rounding) => {
  // Tentukan satuan pembulatan: 100, 1000, atau none (0)
  const unit = rounding === "100" ? 100 : rounding === "1000" ? 1000 : 0;

  // Inisialisasi saldo awal tiap member (semua 0)
  const memberBase = Object.fromEntries(members.map((m) => [m.id, 0]));

  let itemsTotal = 0; // total harga semua item

  // Hitung harga tiap item & bagi ke member yang ditugaskan
  for (const it of items) {
    const line = (Number(it.price) || 0) * (Number(it.qty) || 0); // harga x qty
    itemsTotal += line;

    // Tentukan siapa saja yang share item ini
    const assignees =
      it.assignees && it.assignees.length
        ? it.assignees
        : members.map((m) => m.id); // kalau kosong, bagi rata ke semua member

    if (assignees.length === 0) continue; // skip kalau nggak ada penerima

    const share = line / assignees.length; // harga dibagi rata per assignee

    // Tambahkan share ke saldo masing-masing member
    for (const mId of assignees) {
      if (memberBase[mId] != null) memberBase[mId] += share;
    }
  }

  // Hitung biaya tambahan (persentase berdasarkan subtotal items)
  const taxAmt = itemsTotal * ((Number(charges.taxPct) || 0) / 100);
  const serviceAmt = itemsTotal * ((Number(charges.servicePct) || 0) / 100);
  const tipAmt = itemsTotal * ((Number(charges.tipPct) || 0) / 100);
  const discountAmt = Number(charges.discountRp) || 0; // diskon dalam Rp

  // Hitung total akhir (tidak boleh minus → Math.max(0, ...))
  const grandTotal = Math.max(
    0,
    itemsTotal + taxAmt + serviceAmt + tipAmt - discountAmt,
  );

  const perMember = []; // daftar rincian per member
  let sumRounded = 0; // total hasil rounding semua member

  // Distribusi biaya tambahan ke tiap member berdasarkan proporsi belanja
  for (const m of members) {
    const base = memberBase[m.id] || 0; // belanja awal member
    const factor = itemsTotal > 0 ? base / itemsTotal : 0; // proporsi belanja

    // Bagi biaya tambahan sesuai proporsi
    const extraTax = taxAmt * factor;
    const extraService = serviceAmt * factor;
    const extraTip = tipAmt * factor;
    const lessDiscount = discountAmt * factor; // potongan diskon

    // Hitung total sebelum pembulatan
    const total = base + extraTax + extraService + extraTip - lessDiscount;

    // Bulatkan sesuai unit (100, 1000, atau none)
    const rounded = roundTo(total, unit);

    sumRounded += rounded; // akumulasi total hasil rounding

    // Simpan rincian per member
    perMember.push({
      id: m.id,
      name: m.name,
      base,
      extraTax,
      extraService,
      extraTip,
      lessDiscount,
      total,
      rounded,
    });
  }

  // Hitung selisih antara total setelah rounding dengan grandTotal asli
  const deltaRounding = Math.round(sumRounded - grandTotal);

  // Return hasil akhir
  return {
    totals: { itemsTotal, taxAmt, serviceAmt, tipAmt, discountAmt, grandTotal },
    perMember,
    deltaRounding,
    unit,
  };
};

// Fungsi untuk membangun teks hasil split bill (siap di-copy ke WhatsApp)
export const buildWhatsAppText = (breakdown, fmt) => {
  const { totals, perMember, deltaRounding, unit } = breakdown;

  // Header ringkasan total
  const head = [
    "— SPLIT BILL —",
    `Subtotal: ${fmt(totals.itemsTotal)}`,
    `Tax: ${fmt(totals.taxAmt)} | Service: ${fmt(
      totals.serviceAmt,
    )} | Tip: ${fmt(totals.tipAmt)} | Disc: -${fmt(totals.discountAmt)}`,
    `Grand Total: ${fmt(totals.grandTotal)}`,
    `Rounding per orang: ${unit ? `nearest ${unit}` : "none"}${
      deltaRounding ? ` (Δ total vs rounded: ${fmt(deltaRounding)})` : ""
    }`,
    "",
  ].join("\n");

  // Detail per orang
  const lines = perMember.map(
    (p) => `• ${p.name}: ${fmt(p.rounded)} (before round ${fmt(p.total)})`,
  );

  // Gabungkan jadi string final
  return head + lines.join("\n");
};

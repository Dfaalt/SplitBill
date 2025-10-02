import { useState } from "react";

const ItemManager = ({ members, items, setItems }) => {
  const [form, setForm] = useState({ name: "", price: "", qty: 1 });

  const addItem = () => {
    const name = form.name.trim();
    const price = Number(form.price) || 0;
    const qty = Number(form.qty) || 1;
    if (!name || price <= 0 || qty <= 0) return;
    setItems((prev) => [
      ...prev,
      {
        id: crypto.randomUUID?.() ?? Math.random().toString(36).slice(2),
        name,
        price,
        qty,
        assignees: [],
      },
    ]);
    setForm({ name: "", price: "", qty: 1 });
  };

  const removeItem = (id) =>
    setItems((prev) => prev.filter((i) => i.id !== id));

  const toggleAssign = (itemId, memberId) => {
    setItems((prev) =>
      prev.map((it) => {
        if (it.id !== itemId) return it;
        const has = it.assignees.includes(memberId);
        return {
          ...it,
          assignees: has
            ? it.assignees.filter((id) => id !== memberId)
            : [...it.assignees, memberId],
        };
      }),
    );
  };

  return (
    <div className="rounded-2xl bg-gray-800 p-4 shadow">
      <h2 className="mb-3 text-center text-lg font-semibold text-gray-100">
        Tambah Item
      </h2>

      {/* 🔧 FORM: responsive grid + tinggi seragam */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addItem(); // sama kayak klik tombol
        }}
        className="mb-3 flex flex-col gap-2 sm:flex-row"
      >
        {/* grid khusus untuk input */}
        <div className="grid flex-1 grid-cols-3 gap-2">
          <input
            className="h-10 w-full rounded border border-gray-600 bg-gray-700 px-3 text-gray-100 placeholder-gray-300"
            placeholder="Nama item"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          />
          <input
            className="h-10 w-full rounded border border-gray-600 bg-gray-700 px-3 text-gray-100 placeholder-gray-300"
            placeholder="Harga (Rp)"
            type="number"
            min="0"
            value={form.price}
            onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
          />
          <input
            className="h-10 w-full rounded border border-gray-600 bg-gray-700 px-3 text-gray-100 placeholder-gray-300"
            placeholder="Qty"
            type="number"
            min="1"
            value={form.qty}
            onChange={(e) => setForm((f) => ({ ...f, qty: e.target.value }))}
          />
        </div>

        {/* tombol submit */}

        <button
          type="submit"
          className="h-10 cursor-pointer rounded bg-sky-700 px-4 text-white transition-all duration-200 ease-in-out hover:scale-105 hover:bg-sky-600 hover:shadow-lg active:scale-95"
        >
          Tambah
        </button>
      </form>

      {items.length === 0 ? (
        <p className="text-sm text-gray-400">Belum ada item.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-700 text-sm">
            <thead className="bg-gray-700">
              <tr>
                <th className="border border-gray-700 p-2 text-gray-100">
                  Nama
                </th>
                <th className="border border-gray-700 p-2 text-gray-100">
                  Harga
                </th>
                <th className="border border-gray-700 p-2 text-gray-100">
                  Qty
                </th>
                <th className="border border-gray-700 p-2 text-gray-100">
                  Assign (yang makan)
                </th>
                <th className="border border-gray-700 p-2"></th>
              </tr>
            </thead>
            <tbody>
              {items.map((it) => (
                <tr key={it.id} className="odd:bg-gray-800 even:bg-gray-800/70">
                  <td className="border border-gray-700 p-2 text-gray-100">
                    {it.name}
                  </td>
                  <td className="border border-gray-700 p-2 text-gray-100">
                    Rp{Number(it.price).toLocaleString("id-ID")}
                  </td>
                  <td className="border border-gray-700 p-2 text-gray-100">
                    {it.qty}
                  </td>
                  <td className="border border-gray-700 p-2">
                    <div className="flex flex-wrap gap-2">
                      {members.map((m) => (
                        <label
                          key={m.id}
                          className="inline-flex items-center gap-1"
                        >
                          <input
                            type="checkbox"
                            className="cursor-pointer accent-emerald-400"
                            checked={it.assignees.includes(m.id)}
                            onChange={() => toggleAssign(it.id, m.id)}
                          />
                          <span>{m.name}</span>
                        </label>
                      ))}
                    </div>
                    <p className="mt-1 text-xs text-gray-400">
                      *Jika tidak ada yang dipilih, dianggap semua ikut makan
                      item ini.
                    </p>
                  </td>
                  <td className="border border-gray-700 p-2">
                    <button
                      onClick={() => removeItem(it.id)}
                      className="cursor-pointer rounded bg-transparent text-red-600 transition-all duration-200 ease-in-out hover:scale-105 hover:text-red-500 hover:shadow-sm active:scale-95"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ItemManager;

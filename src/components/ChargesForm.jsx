const ChargesForm = ({ charges, setCharges }) => {
  const set = (k, v) => setCharges((prev) => ({ ...prev, [k]: v }));
  return (
    <div className="rounded-2xl bg-white p-4 shadow dark:bg-gray-800">
      <h2 className="mb-3 text-lg font-semibold text-gray-900 dark:text-gray-100">
        Biaya Tambahan
      </h2>
      <div className="grid grid-cols-4 gap-3">
        <label className="flex flex-col">
          <span className="mb-1 text-sm text-gray-600 dark:text-gray-300">
            Tax %
          </span>
          <input
            type="number"
            min="0"
            step="0.1"
            className="rounded border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-300"
            value={charges.taxPct}
            onChange={(e) => set("taxPct", e.target.value)}
          />
        </label>
        <label className="flex flex-col">
          <span className="mb-1 text-sm text-gray-600 dark:text-gray-300">
            Service %
          </span>
          <input
            type="number"
            min="0"
            step="0.1"
            className="rounded border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-300"
            value={charges.servicePct}
            onChange={(e) => set("servicePct", e.target.value)}
          />
        </label>
        <label className="flex flex-col">
          <span className="mb-1 text-sm text-gray-600 dark:text-gray-300">
            Disc (Rp)
          </span>
          <input
            type="number"
            min="0"
            step="100"
            className="rounded border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-300"
            value={charges.discountRp}
            onChange={(e) => set("discountRp", e.target.value)}
          />
        </label>
        <label className="flex flex-col">
          <span className="mb-1 text-sm text-gray-600 dark:text-gray-300">
            Tip %
          </span>
          <input
            type="number"
            min="0"
            step="0.1"
            className="rounded border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-300"
            value={charges.tipPct}
            onChange={(e) => set("tipPct", e.target.value)}
          />
        </label>
      </div>
      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
        Tax/Service/Tip dihitung dari subtotal item, Discount (Rp) mengurangi
        total & dibagi proporsional.
      </p>
    </div>
  );
};

export default ChargesForm;

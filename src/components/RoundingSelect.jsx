const RoundingSelect = ({ rounding, setRounding }) => (
  <div className="rounded-2xl bg-white p-4 shadow dark:bg-gray-800">
    <h2 className="mb-3 text-lg font-semibold text-gray-900 dark:text-gray-100">
      Rounding per Orang
    </h2>
    <select
      className="rounded border border-gray-300 bg-white px-3 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
      value={rounding}
      onChange={(e) => setRounding(e.target.value)}
    >
      <option value="none">None</option>
      <option value="100">Nearest 100</option>
      <option value="1000">Nearest 1000</option>
    </select>
    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
      Rounding/pembulatan dilakukan per orang. Selisih total pembulatan
      akan ditampilkan.
    </p>
  </div>
);

export default RoundingSelect;

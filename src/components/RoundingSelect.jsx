const RoundingSelect = ({ rounding, setRounding }) => (
  <div className="rounded-2xl bg-gray-800 p-4 text-center shadow">
    <h2 className="mb-3 text-lg font-semibold text-gray-100">
      Rounding per Orang
    </h2>
    <select
      className="rounded border border-gray-600 bg-gray-700 px-3 py-2 text-gray-100"
      value={rounding}
      onChange={(e) => setRounding(e.target.value)}
    >
      <option value="none">None</option>
      <option value="100">Nearest 100</option>
      <option value="1000">Nearest 1000</option>
    </select>
    <p className="mt-2 text-xs text-gray-400">
      Rounding/pembulatan dilakukan per orang. Selisih total pembulatan akan
      ditampilkan.
    </p>
  </div>
);

export default RoundingSelect;

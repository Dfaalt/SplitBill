import { useState } from "react";
import { uid } from "../utils/format.js";

const MemberManager = ({ members, setMembers }) => {
  const [name, setName] = useState("");

  const add = () => {
    const nm = name.trim();
    if (!nm) return;
    setMembers((prev) => [...prev, { id: uid(), name: nm }]);
    setName("");
  };

  const remove = (id) => setMembers((prev) => prev.filter((m) => m.id !== id));

  return (
    <div className="rounded-2xl bg-gray-800 p-4 shadow">
      <h2 className="mb-3 text-center text-lg font-semibold text-gray-100">
        Tambah Member
      </h2>
      <form
        onSubmit={(e) => {
          e.preventDefault(); // cegah reload halaman
          add(); // panggil fungsi add()
        }}
        className="mb-3 flex gap-2"
      >
        <input
          className="border-gray600 flex-1 rounded border bg-gray-700 px-3 py-2 text-gray-100"
          placeholder="Nama"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button
          type="submit"
          className="cursor-pointer rounded bg-sky-700 px-4 py-2 text-white transition-all duration-200 ease-in-out hover:scale-105 hover:bg-sky-600 hover:shadow-lg active:scale-95"
        >
          Tambah
        </button>
      </form>

      <ul className="space-y-2">
        {members.map((m) => (
          <li
            key={m.id}
            className="flex items-center justify-between rounded border border-gray-600 bg-gray-700 px-3 py-2 text-gray-100"
          >
            <span>{m.name}</span>

            <button
              onClick={() => remove(m.id)}
              className="cursor-pointer rounded bg-transparent text-red-600 transition-all duration-200 ease-in-out hover:scale-105 hover:text-red-500 hover:shadow-sm active:scale-95"
            >
              Hapus
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MemberManager;

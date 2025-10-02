import { useState } from "react";
import { uid } from "../utils/format.js";
import ElectricBorder from "./ElectricBorder/ElectricBorder.jsx";

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
    <div className="rounded-2xl bg-white p-4 shadow dark:bg-gray-800">
      <h2 className="mb-3 text-center text-lg font-semibold text-gray-900 dark:text-gray-100">
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
          className="dark:border-gray600 flex-1 rounded border border-gray-300 bg-white px-3 py-2 text-gray-900 dark:bg-gray-700 dark:text-gray-100"
          placeholder="Nama"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <ElectricBorder
          color="#00FF91"
          speed={1}
          chaos={0.5}
          thickness={2}
          style={{ borderRadius: 16 }}
        >
          <button
            type="submit"
            className="cursor-pointer rounded bg-transparent px-4 py-2 text-white transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-lg active:scale-95 dark:text-white"
          >
            Tambah
          </button>
        </ElectricBorder>
      </form>

      <ul className="space-y-2">
        {members.map((m) => (
          <li
            key={m.id}
            className="flex items-center justify-between rounded border border-gray-300 bg-white px-3 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
          >
            <span>{m.name}</span>
            <ElectricBorder
              color="#FE2A2A"
              speed={1}
              chaos={0.5}
              thickness={2}
              style={{ borderRadius: 16 }}
            >
              <button
                onClick={() => remove(m.id)}
                className="cursor-pointer rounded bg-transparent text-red-600 transition-all duration-200 ease-in-out hover:scale-105 hover:text-red-400 hover:shadow-sm active:scale-95 dark:text-red-600"
              >
                Hapus
              </button>
            </ElectricBorder>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MemberManager;

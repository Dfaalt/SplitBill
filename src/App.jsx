import { useState } from "react";
import MemberManager from "./components/MemberManager.jsx";
import ItemManager from "./components/ItemManager.jsx";
import ChargesForm from "./components/ChargesForm.jsx";
import RoundingSelect from "./components/RoundingSelect.jsx";
import SummaryPanel from "./components/SummaryPanel.jsx";
import { Toaster } from "react-hot-toast";
import TextType from "./components/TextType/TextType.jsx";

const App = () => {
  const [members, setMembers] = useState([
    { id: "m1", name: "Person 1" },
    { id: "m2", name: "Person 2" },
  ]);
  const [items, setItems] = useState([]);
  const [charges, setCharges] = useState({
    taxPct: 0,
    servicePct: 0,
    discountRp: 0,
    tipPct: 0,
  });
  const [rounding, setRounding] = useState("none");

  return (
    <div className="flex min-h-dvh flex-col bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <header className="bg-white px-6 py-4 dark:bg-sky-700">
        <h1 className="text-xl font-bold">
          <TextType
            text={["Split Bill", "Welcome Fella!"]}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter="|"
          />
        </h1>
      </header>
      <main className="flex-1 p-6">
        <div className="mx-auto grid max-w-5xl items-start gap-6 lg:grid-cols-3">
          <div className="grid gap-6 lg:col-span-2">
            <MemberManager members={members} setMembers={setMembers} />
            <ItemManager members={members} items={items} setItems={setItems} />
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <ChargesForm charges={charges} setCharges={setCharges} />
              <RoundingSelect rounding={rounding} setRounding={setRounding} />
            </div>
          </div>
          <aside className="self-start lg:sticky lg:top-6 lg:col-span-1">
            <SummaryPanel
              members={members}
              items={items}
              charges={charges}
              rounding={rounding}
            />
          </aside>
        </div>
      </main>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#333",
            color: "#fff",
          },
        }}
      />
      <footer className="bg-white px-6 py-4 text-sm dark:bg-gray-800">
        <div className="mx-auto max-w-5xl text-center">
          © 2025 Split Bill. Made by Dfaalt
        </div>
      </footer>
    </div>
  );
};

export default App;

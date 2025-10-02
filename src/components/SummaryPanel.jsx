import { useMemo } from "react";
import { computeBreakdown, buildWhatsAppText } from "../utils/calc.js";
import { fmtIDR } from "../utils/format.js";
import toast from "react-hot-toast";

const SummaryPanel = ({ members, items, charges, rounding }) => {
  const data = useMemo(
    () => computeBreakdown(members, items, charges, rounding),
    [members, items, charges, rounding],
  );

  const copyText = async () => {
    const text = buildWhatsAppText(data, fmtIDR);
    await navigator.clipboard.writeText(text);
    toast.success("Ringkasan telah disalin!");
  };

  const { totals, perMember, deltaRounding } = data;

  return (
    <div className="rounded-2xl bg-gray-800 p-4 shadow">
      <h2 className="mb-3 text-center text-lg font-semibold text-gray-100">
        Ringkasan
      </h2>
      <div className="grid grid-cols-2 gap-2 text-sm text-gray-100">
        <div>Subtotal</div>
        <div className="text-right">{fmtIDR(totals.itemsTotal)}</div>
        <div>Tax</div>
        <div className="text-right">{fmtIDR(totals.taxAmt)}</div>
        <div>Service</div>
        <div className="text-right">{fmtIDR(totals.serviceAmt)}</div>
        <div>Tip</div>
        <div className="text-right">{fmtIDR(totals.tipAmt)}</div>
        <div>Discount</div>
        <div className="text-right">- {fmtIDR(totals.discountAmt)}</div>
        <div className="font-semibold">Grand Total</div>
        <div className="text-right font-semibold">
          {fmtIDR(totals.grandTotal)}
        </div>
      </div>

      <div className="mt-4">
        <h3 className="mb-2 font-medium text-gray-100">Per Orang</h3>
        <ul className="space-y-2">
          {perMember.map((p) => (
            <li
              key={p.id}
              className="flex justify-between rounded border border-gray-600 bg-gray-700 px-3 py-2 text-gray-100"
            >
              <span>{p.name}</span>
              <span className="font-semibold">{fmtIDR(p.rounded)}</span>
            </li>
          ))}
        </ul>
        {deltaRounding !== 0 && (
          <p className="mt-2 text-center text-xs text-gray-400">
            Δ akibat rounding (∑ per orang vs grand total):{" "}
            {fmtIDR(deltaRounding)}
          </p>
        )}
        <div className="mt-3 flex justify-center">
          <button
            onClick={copyText}
            className="cursor-pointer rounded-lg bg-emerald-500 px-5 py-2.5 font-medium text-gray-900 shadow-md transition-all duration-300 hover:scale-105 hover:bg-emerald-400 hover:shadow-lg active:scale-95"
          >
            Copy (WhatsApp)
          </button>
        </div>
      </div>
    </div>
  );
};

export default SummaryPanel;

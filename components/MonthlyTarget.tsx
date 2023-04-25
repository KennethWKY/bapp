import { useEffect, useState } from "react";
import BottomNav from "./BottomNav";

export default function MonthlyTarget({
  monthlyTarget,
  income,
}: {
  monthlyTarget: { category: string; target: number }[];
  income: number;
}) {
  const [ttlExpense, setTtlExpense] = useState(0);
  const [saving, setSaving] = useState(0);

  useEffect(() => {
    let ttlExpense = 0;
    for (let i = 0; i < monthlyTarget.length; i++) {
      ttlExpense += monthlyTarget[i].target;
    }
    setTtlExpense(ttlExpense);
    setSaving(income - ttlExpense);
  });

  return (
    <div>
      <div className="py-4">
        <h2 className="text-xl font-bold mb-4">This Month Budget</h2>
        <div className="flex justify-between mb-2">
          <span className="font-semibold">Total Expense:</span>
          <span>{ttlExpense}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="font-semibold">Income:</span>
          <span>{income}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="font-semibold">Savings:</span>
          <span>{saving}</span>
        </div>

        <hr className="my-4" />
        <h3 className="text-xl font-bold mb-2">This Month Targets</h3>
        <ul className="divide-y divide-gray-400">
          {monthlyTarget.map((data) => (
            <li key={data.category} className="flex justify-between py-2">
              <span className="font-semibold">{data.category}:</span>
              <span>{data.target}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

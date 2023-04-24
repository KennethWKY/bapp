import { useState, useEffect } from "react";
import { getAllExpense, calMonthlyTtlExpense } from "../modules/budgetData";

export default function MonthlyExpense() {
  const [expenseData, setExpenseData] = useState<any[]>([]);
  const [monthlyTtl, setMonthlyTtl] = useState<any[]>([]);

  //Fetch monthly expense
  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllExpense();
      const data = await response.json();
      setExpenseData(data);

      //Calculate monthly total expense in each category
      if (data) {
        const result = calMonthlyTtlExpense(data);
        setMonthlyTtl(result);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Monthly Expenses</h2>
      <div className="bg-gray-200 p-4 rounded-lg">
        {monthlyTtl ? (
          <ul>
            {monthlyTtl.map((expense) => (
              <li key={expense._id} className="mb-2">
                <span className="font-semibold">{expense.type}: </span>
                <span>{expense.amount}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading expense data...</p>
        )}
      </div>
    </div>
  );
}

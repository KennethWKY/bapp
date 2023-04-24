import { useState, useEffect, SetStateAction } from "react";
import { getAllExpense, calMonthlyTtlExpense } from "../modules/budgetData";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function MonthlyExpense() {
  const [expenseData, setExpenseData] = useState<any[]>([]);
  const [monthlyTtl, setMonthlyTtl] = useState<any[]>([]);
  const [startDate, setStartDate] = useState(new Date());

  //Fetch monthly expense
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllExpense(startDate);
      setExpenseData(data);

      //Calculate monthly total expense in each category
      if (data) {
        const result = calMonthlyTtlExpense(data);
        setMonthlyTtl(result);
      }
    };
    fetchData();
    console.log(startDate);
  }, [startDate]);

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Monthly Expenses</h2>
      <div className="bg-gray-200 p-4 rounded-lg">
        <div className="mb-4">
          <span className="font-semibold mr-2">Select Month: </span>
          <DatePicker
            selected={startDate}
            onChange={(date: SetStateAction<Date>) => setStartDate(date)}
            dateFormat="MM/yyyy"
            showMonthYearPicker
          />
        </div>
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

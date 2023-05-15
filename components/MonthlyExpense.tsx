import { useState, useEffect } from "react";
import {
  getAllExpense,
  calMonthlyTtlExpense,
  getCategory,
  getRemainToSpend,
  getIncome,
} from "../modules/budgetData";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import BottomNav from "./BottomNav";
import Skeleton from "./Skeleton";

export default function MonthlyExpense() {
  const [expenseData, setExpenseData] = useState<any[]>([]);
  const [monthlyTtl, setMonthlyTtl] = useState<any[]>([]);
  const [startDate, setStartDate] = useState(new Date());
  const [expenseCategory, setExpenseCategory] = useState<any[]>([]);
  const [remainToSpend, setRemainToSpend] = useState<any[]>([]);
  const [income, setIncome] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      //Fetch monthly expense
      const monthlyExpenseData = await getAllExpense(startDate);
      setExpenseData(monthlyExpenseData);

      //Fetch Income
      const incomeData = await getIncome();
      setIncome(incomeData);

      //Calculate monthly total expense in each category
      if (expenseData) {
        //Get Monthly Target
        const categoryData = await getCategory();
        setExpenseCategory(categoryData);

        const result = calMonthlyTtlExpense(monthlyExpenseData);
        setMonthlyTtl(result);

        if (expenseCategory) {
          //Get remain to spend
          const remainToSpendData = getRemainToSpend(
            monthlyTtl,
            expenseCategory
          );
          setRemainToSpend(remainToSpendData);
        }
      }
    };
    fetchData();
  }, [startDate]);

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Monthly Expenses</h2>
      <div className="mb-4">
        <span className="font-semibold mr-2">Select Month:</span>
        <DatePicker
          selected={startDate}
          onChange={(date: Date | null) => setStartDate(date as Date)}
          dateFormat="MM/yyyy"
          showMonthYearPicker
          className="bg-white rounded-md px-4 py-2 border border-gray-300 text-gray-700 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out"
        />
      </div>
      <div className="bg-gray-200 p-4 rounded-lg">
        {monthlyTtl ? (
          <ul className="divide-y divide-gray-400">
            {expenseData.map((expense) => (
              <li key={expense._id} className="flex justify-between py-2">
                <div>
                  <span className="font-semibold pr-3">{expense.descr}</span>
                  <span className="font-semibold">({expense.type} </span>
                  <span className="font-semibold">
                    {new Date(expense.date).toLocaleDateString()})
                  </span>
                </div>
                <span className="font-semibold">$ {expense.amount}</span>
              </li>
            ))}
          </ul>
        ) : (
          <Skeleton />
        )}
      </div>
      <BottomNav />
    </div>
  );
}

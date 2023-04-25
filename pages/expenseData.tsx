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
import MonthlyTarget from "../components/MonthlyTarget";
import RemainToSpend from "../components/RemainToSpend";
import BottomNav from "../components/BottomNav";
import Skeleton from "../components/Skeleton";

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
      if (monthlyExpenseData) {
        //Get Monthly Target
        const categoryData = await getCategory();
        setExpenseCategory(categoryData);

        const result = calMonthlyTtlExpense(monthlyExpenseData);
        setMonthlyTtl(result);
      }
    };
    fetchData();
  }, [startDate]);

  useEffect(() => {
    const remainToSpendData = getRemainToSpend(monthlyTtl, expenseCategory);
    setRemainToSpend(remainToSpendData);
  }, [expenseCategory]);

  return (
    <div className="flex flex-col items-center">
      <div className="bg-white shadow-lg rounded-lg px-8 py-6 sm:max-w-md sm:w-full">
        <div className="text-3xl text-green-600 mb-4">Budget Gur</div>
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Monthly Expenses</h2>

          <div className="bg-gray-200 p-4 rounded-lg my-2">
            {expenseCategory ? (
              <MonthlyTarget monthlyTarget={expenseCategory} income={income} />
            ) : (
              <Skeleton />
            )}
          </div>
          <div className="bg-gray-200 p-4 rounded-lg my-2">
            {remainToSpend ? (
              <RemainToSpend remain={remainToSpend} />
            ) : (
              <Skeleton />
            )}
          </div>
        </div>
        <BottomNav />
      </div>
    </div>
  );
}

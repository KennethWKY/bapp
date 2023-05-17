import { useEffect, useState } from "react";
import BottomNav from "../components/BottomNav";
import MonthlyTarget from "../components/MonthlyTarget";
import {
  calMonthlyTtlExpense,
  getAllExpense,
  getCategory,
  getIncome,
  getRemainToSpend,
  getFixedExpense,
} from "../modules/budgetData";
import Skeleton from "../components/Skeleton";

export default function profile() {
  const [expenseData, setExpenseData] = useState<any[]>([]);
  const [monthlyTtl, setMonthlyTtl] = useState<any[]>([]);
  const [startDate, setStartDate] = useState(new Date());
  const [expenseCategory, setExpenseCategory] = useState<any[]>([]);
  const [remainToSpend, setRemainToSpend] = useState<any[]>([]);
  const [income, setIncome] = useState(0);
  const [fixedExpense, setFixedExpense] = useState<any[]>([]);

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
        //Fetch fixed expense
        const fixedExpenseData = await getFixedExpense();
        setFixedExpense(fixedExpenseData);
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
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="relative max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
          <div className="text-3xl text-green-600 mb-4">Budget Gur</div>
          <div className="mt-8">
            {/* <h2 className="text-xl font-bold mb-4">Monthly Expenses</h2> */}

            <div className="bg-gray-200 p-4 rounded-lg my-2">
              {expenseCategory ? (
                <MonthlyTarget
                  monthlyTarget={expenseCategory}
                  income={income}
                  fixedExpense={fixedExpense}
                />
              ) : (
                <Skeleton />
              )}
            </div>
          </div>
          <BottomNav />
        </div>
      </div>
    </div>
  );
}

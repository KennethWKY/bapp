import { useEffect, useState } from "react";
import {
  deleteCategory,
  getAllExpense,
  getCategory,
  postBudgetCategoryAPI,
} from "../modules/budgetData";
import router from "next/router";

export default function ModifyBudget() {
  const [expenseCategory, setExpenseCategory] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const categoryData = await getCategory();
        setExpenseCategory(categoryData);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const handleSave = async (type: any, amount: any) => {
    const data = {
      type,
      amount,
    };
    console.log(data);
    postBudgetCategoryAPI(data);
    router.reload();
  };

  const handleDelete = async (type: any, amount: any) => {
    const data = {
      type,
      amount,
    };
    console.log(data);
    deleteCategory(data);
    router.reload();
  };

  return (
    <div>
      {expenseCategory.map((data) => (
        <div
          className="flex flex-row items-center justify-between"
          key={data.category}
        >
          <label className="mr-2">{data.category}</label>
          <div className="flex flex-row items-center m-1">
            <input
              type="number"
              defaultValue={data.target}
              className="border border-gray-400 p-1 rounded-lg w-20 mr-2 px-2 py-0"
              onChange={(event) => {
                data.target = Number(event.target.value);
              }}
            />
            <button
              className="px-2 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm mr-1"
              onClick={() => handleSave(data.category, data.target)}
            >
              Save
            </button>
            <button
              className="px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm"
              onClick={() => handleDelete(data.category, data.target)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

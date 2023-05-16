import { useEffect, useState } from "react";
import {
  deleteCategory,
  deleteFixedExpense,
  getFixedExpense,
  postBudgetCategoryAPI,
  postFixedExpense,
} from "../modules/budgetData";
import router from "next/router";

export default function ModifyFixedExpense() {
  const [fixedExpense, setFixedExpense] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const fixedExpenseData = await getFixedExpense();
        setFixedExpense(fixedExpenseData);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const handleSave = async (category: any, cost: any) => {
    const data = {
      category,
      cost,
    };
    postFixedExpense(data);
    router.reload();
  };

  const handleDelete = async (category: any, cost: any) => {
    const data = {
      category,
      cost,
    };
    deleteFixedExpense(data);
    router.reload();
  };

  return (
    <div>
      {fixedExpense.map((data) => (
        <div className="flex flex-row items-center justify-between">
          <label className="mr-2">{data.category}</label>
          <div className="flex flex-row items-center m-1">
            <input
              type="number"
              defaultValue={data.cost}
              className="border border-gray-400 px-2 py-0 rounded-lg w-20 mr-2"
              onChange={(event) => {
                data.cost = Number(event.target.value);
              }}
            />
            <button
              className="px-2 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm mr-1"
              onClick={() => handleSave(data.category, data.cost)}
            >
              Save
            </button>
            <button
              className="px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm"
              onClick={() => handleDelete(data.category, data.cost)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

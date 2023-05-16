import router from "next/router";
import { useEffect, useState } from "react";
import {
  deleteCategory,
  deleteFixedExpense,
  getFixedExpense,
  postBudgetCategoryAPI,
  postFixedExpense,
} from "../modules/budgetData";

export default function AddFixedExpense() {
  const handleSubmit = async (event: {
    preventDefault: () => void;
    target: any;
  }) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const category = formData.get("category") as string;
    const cost = formData.get("cost") as unknown as number;
    const data = {
      category,
      cost,
    };
    await postFixedExpense(data);
    router.push(router.asPath);
    router.reload();
  };

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
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Expense:</label>
          <input
            name="category"
            type="text"
            className="border border-gray-400 p-2 rounded-lg w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Cost:</label>
          <input
            name="cost"
            type="number"
            className="border border-gray-400 p-2 rounded-lg w-full"
          />
        </div>
        <button
          className="bg-green-600 text-white py-2 px-4 rounded-lg"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

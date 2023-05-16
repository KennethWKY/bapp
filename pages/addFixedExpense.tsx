import React from "react";
import BottomNav from "../components/BottomNav";
import { useRouter } from "next/router";
import ModifyFixedExpense from "../components/ModifyFixedExpense";
import { useEffect, useState } from "react";
import {
  deleteCategory,
  deleteFixedExpense,
  getFixedExpense,
  postBudgetCategoryAPI,
  postFixedExpense,
} from "../modules/budgetData";

export default function addFixedExpense() {
  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   const form = event.target;
  //   const formData = new FormData(form);
  //   const data = {
  //     type: formData.get("type"),
  //     amount: parseFloat(formData.get("amount")),
  //   };
  //   const result = await postBudgetCategoryAPI(data);
  //   console.log(result);
  // };
  const router = useRouter();
  const handleSubmit = async (event: {
    preventDefault: () => void;
    target: any;
  }) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const category = formData.get("category") as string;
    const amountString = formData.get("cost") as string | null;
    if (!amountString) {
      return; // or handle the error as needed
    }
    const cost = parseFloat(amountString);
    const data = {
      category,
      cost,
    };
    postFixedExpense(data);
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
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="relative max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
          <div className="text-3xl text-green-600 mb-4">Budget Gur</div>
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
          <div className="text-xl font-bold mb-4 mt-8">Add Fixed Expense</div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col mb-4">
              <label className="text-lg mb-2" htmlFor="category">
                Category
              </label>
              <input
                className="border border-gray-400 p-2 rounded-lg"
                type="text"
                name="category"
                id="category"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="text-lg mb-2" htmlFor="cost">
                Cost
              </label>
              <input
                className="border border-gray-400 p-2 rounded-lg"
                type="number"
                name="cost"
                id="cost"
              />
            </div>
            <button
              className="bg-green-600 text-white py-2 px-4 rounded-lg"
              type="submit"
            >
              Submit
            </button>
          </form>
          <BottomNav />
        </div>
      </div>
    </div>
  );
}

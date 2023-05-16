import React from "react";
import BottomNav from "../components/BottomNav";
import { useRouter } from "next/router";
import ModifyFixedExpense from "../components/ModifyFixedExpense";
import { postFixedExpense } from "../modules/budgetData";

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

  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="relative max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
          <div className="text-3xl text-green-600 mb-4">Budget Gur</div>
          <ModifyFixedExpense />
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

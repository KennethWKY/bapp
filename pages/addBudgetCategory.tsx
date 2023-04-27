import React from "react";
import BottomNav from "../components/BottomNav";
import { postBudgetCategoryAPI } from "../modules/budgetData";

export default function addBudgetCategory() {
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
  const handleSubmit = async (event: {
    preventDefault: () => void;
    target: any;
  }) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const type = formData.get("type") as string;
    const amountString = formData.get("amount") as string | null;
    if (!amountString) {
      return; // or handle the error as needed
    }
    const amount = parseFloat(amountString);
    const data = {
      type,
      amount,
    };
    const result = await postBudgetCategoryAPI(data);
    console.log(result);
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="relative max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
          <div className="text-3xl text-green-600 mb-4">Budget Gur</div>
          <div className="text-xl font-bold mb-4 mt-8">Add Monthly Budget</div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col mb-4">
              <label className="text-lg mb-2" htmlFor="type">
                Type
              </label>
              <input
                className="border border-gray-400 p-2 rounded-lg"
                type="text"
                name="type"
                id="type"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="text-lg mb-2" htmlFor="amount">
                Amount
              </label>
              <input
                className="border border-gray-400 p-2 rounded-lg"
                type="number"
                name="amount"
                id="amount"
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

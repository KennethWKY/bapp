import React from "react";
import { postBudgetCategoryAPI } from "../modules/budgetData";

export default function TestForm() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = {
      type: formData.get("type"),
      amount: parseFloat(formData.get("amount")),
    };
    const result = await postBudgetCategoryAPI(data);
    console.log(result);
  };
  return (
    <div>
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
            required
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
            required
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

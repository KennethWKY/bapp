import React from "react";
import BottomNav from "../components/BottomNav";

export default function addBudgetCategory() {
  return (
    <div>
      <div className="flex flex-col items-center">
        <div className="bg-white shadow-lg rounded-lg px-8 py-6 sm:max-w-md sm:w-full">
          <div className="text-3xl text-green-600 mb-4">Budget Gur</div>
          <div className="text-xl font-bold mb-4 mt-8">Add Monthly Budget</div>
          <form method="POST" action="/api/budget">
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

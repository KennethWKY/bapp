import { SetStateAction, useEffect, useState } from "react";
import { getCategory } from "../modules/budgetData";

export default function AddExpense() {
  const [expenseCategory, setExpenseCategory] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await getCategory();
      const data = await response;
      setExpenseCategory(data);
    };
    fetchData();
  }, [selectedCategory]);

  const handleSelectChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div>
      <div className="flex flex-col items-center bg-white shadow-lg rounded-lg px-8 py-6 sm:max-w-md sm:w-full">
        <div className="text-2xl text-green-600 mb-4">Add Expense</div>
        <form method="POST" action="/api/expense">
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
            <label className="text-lg mb-2" htmlFor="category">
              Category
            </label>
            <select
              className="border border-gray-400 p-2 rounded-lg"
              name="category"
              id="category"
              value={selectedCategory}
              onChange={handleSelectChange}
            >
              <option value="">Select category</option>
              {expenseCategory &&
                expenseCategory.map((category) => (
                  <option key={category._id} value={category.category}>
                    {category.category}
                  </option>
                ))}
            </select>
          </div>
          <button
            className="bg-green-600 text-white py-2 px-4 rounded-lg"
            type="submit"
            disabled={!selectedCategory}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

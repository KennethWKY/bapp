import { SetStateAction, useEffect, useState } from "react";
import { getCategory } from "../modules/budgetData";
import BottomNav from "../components/BottomNav";
import { addExpense as addExpenseAPI } from "../modules/budgetData";
import router from "next/router";

export default function addExpense() {
  const [expenseCategory, setExpenseCategory] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const categoryData = await getCategory();
      setExpenseCategory(categoryData);
    };
    fetchData();
  }, [selectedCategory]);

  const handleSelectChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setSelectedCategory(e.target.value);
  };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   const form = event.target;
  //   const formData = new FormData(form);
  //   const data = {
  //     type: formData.get("type"),
  //     descr: formData.get("descr"),
  //     amount: parseFloat(formData.get("amount")),
  //   };
  //   const result = await addExpenseAPI(data);
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
    const descr = formData.get("descr") as string;
    const amountString = formData.get("amount") as string | null;
    if (!amountString) {
      return; // or handle the error as needed
    }
    const amount = parseFloat(amountString);
    const data = {
      type,
      descr,
      amount,
    };
    const result = await addExpenseAPI(data);
    router.push(router.asPath);
    console.log(result);
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="relative max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
          <div className="text-3xl text-green-600 mb-4">Budget Gur</div>
          <div className="flex flex-col items-center bg-white shadow-lg rounded-lg px-8 py-6 sm:max-w-md sm:w-full">
            <div className="text-2xl text-green-600 mb-4">Add Expense</div>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col mb-4">
                <label className="text-lg mb-2" htmlFor="category">
                  Category
                </label>
                <select
                  className="border border-gray-400 p-2 rounded-lg"
                  name="type"
                  id="type"
                  value={selectedCategory}
                  onChange={handleSelectChange}
                >
                  <option value="">Select category</option>
                  {expenseCategory &&
                    expenseCategory.map((category) => (
                      <option key={category.category} value={category.category}>
                        {category.category}
                      </option>
                    ))}
                </select>
              </div>
              <div className="flex flex-col mb-4">
                <label className="text-lg mb-2" htmlFor="type">
                  Description
                </label>
                <input
                  className="border border-gray-400 p-2 rounded-lg"
                  type="text"
                  name="descr"
                  id="descr"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label className="text-lg mb-2" htmlFor="type">
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
                disabled={!selectedCategory}
              >
                Submit
              </button>
            </form>
          </div>
          <BottomNav />
        </div>
      </div>
    </div>
  );
}

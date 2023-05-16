import router from "next/router";
import { postFixedExpense } from "../modules/budgetData";

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

  return (
    <div>
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

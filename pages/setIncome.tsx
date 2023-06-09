import router from "next/router";
import BottomNav from "../components/BottomNav";
import { setIncome } from "../modules/budgetData";

export default function SetIncome() {
  const handleSubmit = async (event: {
    preventDefault: () => void;
    target: any;
  }) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const income = formData.get("income") as string;
    setIncome(income);
    router.push(router.asPath);
    router.reload();
  };
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="relative max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
          <div className="text-3xl text-green-600 mb-4">Budget Gur</div>
          <div className="flex flex-col items-center bg-white shadow-lg rounded-lg px-8 py-6 sm:max-w-md sm:w-full">
            <div className="text-xl font-bold mb-4">Monthly Income</div>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col mb-4">
                <label className="text-lg mb-2" htmlFor="type">
                  Income
                </label>
                <input
                  className="border border-gray-400 p-2 rounded-lg"
                  type="text"
                  name="income"
                  id="income"
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
          <BottomNav />
        </div>
      </div>
    </div>
  );
}

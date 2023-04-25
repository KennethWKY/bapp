import MonthlyExpense from "../components/MonthlyExpense";

export default function transactions() {
  return (
    <div>
      <div className="flex flex-col items-center">
        <div className="bg-white shadow-lg rounded-lg px-8 py-6 sm:max-w-md sm:w-full">
          <div className="text-3xl text-green-600 mb-4">Budget Gur</div>
          <MonthlyExpense />
        </div>
      </div>
    </div>
  );
}

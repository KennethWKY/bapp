import MonthlyExpense from "../components/MonthlyExpense";

export default function transactions() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="relative max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
          <div className="text-3xl text-green-600 mb-4">Budget Gur</div>
          <MonthlyExpense />
        </div>
      </div>
    </div>
  );
}

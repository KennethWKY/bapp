export async function getAllExpense() {
  const res = await fetch("api/expense", {
    method: "GET",
  });
  return res;
}

export function calMonthlyTtlExpense(expenseData: any[]) {
  const result = expenseData.reduce(
    (
      acc: { [x: string]: any },
      cur: { type: string | number; amount: string }
    ) => {
      acc[cur.type] = (acc[cur.type] || 0) + parseInt(cur.amount);
      return acc;
    },
    {}
  );
  const monthlyTtl = Object.entries(result).map(([type, amount]) => ({
    type,
    amount,
  }));

  return monthlyTtl;
}

export async function getCategory() {
  const res = await fetch("api/budget", {
    method: "GET",
  });
  const categoryObj = await res.json();
  const categoryArr = Object.keys(categoryObj.monthlyBudget).map((key) => ({
    category: key,
    target: categoryObj.monthlyBudget[key],
  }));
  return categoryArr;
}

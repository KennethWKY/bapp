export async function getAllExpense(month: Date) {
  const formattedMonth =
    month.toLocaleString("default", { month: "short" }) +
    " " +
    month.getFullYear();
  const res = await fetch(`/api/expense?month=${formattedMonth}`);
  const data = await res.json();
  return data;
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
  const res = await fetch("/api/budget", {
    method: "GET",
  });
  const categoryObj = await res.json();
  const categoryArr = Object.keys(categoryObj.monthlyBudget).map((key) => ({
    category: key,
    target: categoryObj.monthlyBudget[key],
  }));
  return categoryArr;
}

export function getRemainToSpend(expenseData: any[], categoryData: any[]) {
  // Group expenses by type
  const expensesByType = expenseData.reduce((acc, cur) => {
    acc[cur.type] = (acc[cur.type] || 0) + parseInt(cur.amount);
    return acc;
  }, {});

  // Compare expenses with category data
  const differences = categoryData.map((category) => {
    const { category: categoryName, target } = category;
    const expense = expensesByType[categoryName] || 0;
    const difference = target - expense;
    return {
      category: categoryName,
      difference,
    };
  });
  return differences;
}

export async function getIncome() {
  const res = await fetch("/api/income", {
    method: "GET",
  });
  const data = await res.json();
  return data;
}

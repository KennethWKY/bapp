import { useState } from "react";
import { getUserID } from "./userData";

export async function getAllExpense(month: Date) {
  const userId = await getUserID();
  const formattedMonth =
    month.toLocaleString("default", { month: "short" }) +
    " " +
    month.getFullYear();
  const res = await fetch(
    `/api/expense?month=${formattedMonth}?userId=${userId}`
  );
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
  const userId = await getUserID();
  const res = await fetch(`/api/budget?userId=${userId}`, {
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

export async function postBudgetCategoryAPI(data: any) {
  const userId = await getUserID();
  const response = await fetch(`/api/budget?userId=${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...data, amount: parseFloat(data.amount) }),
  });
  return response.json();
}

export async function addExpense(data: {
  type: FormDataEntryValue | null;
  descr: FormDataEntryValue | null;
  amount: number;
}) {
  const userId = await getUserID();
  const formattedData = {
    ...data,
    userId: userId,
  };
  const response = await fetch("/api/expense", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formattedData),
  });
  return response.json();
}

export const useFormStatus = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const submitExpense = async (data: {
    type: FormDataEntryValue | null;
    descr: FormDataEntryValue | null;
    amount: number;
  }) => {
    try {
      await addExpense(data);
      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError(true);
    }
  };

  return { success, error, submitExpense };
};

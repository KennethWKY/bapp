import { useState } from "react";
import { getUserID } from "./userData";

let userId: string | null = null;
let monthlyTransactions: number | null = null;
let monthlyTtlExpense: any | null = null;

async function initUserId() {
  if (!userId) {
    userId = await getUserID(); // Call getUserID only if the user ID is not available
  }
  return userId;
}

export async function getAllExpense(month: Date) {
  const formattedMonth =
    month.toLocaleString("default", { month: "short" }) +
    " " +
    month.getFullYear();
  const res = await fetch(
    `/api/expense?month=${formattedMonth}&userId=${await initUserId()}`
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
  //const userId = await getUserID();
  const res = await fetch(`/api/budget?userId=${await initUserId()}`, {
    method: "GET",
  });
  const categoryObj = await res.json();
  const categoryArr = Object.keys(categoryObj.monthlyBudget).map((key) => ({
    category: key,
    target: categoryObj.monthlyBudget[key],
  }));
  return categoryArr;
}

export async function getFixedExpense() {
  //const userId = await getUserID();
  const res = await fetch(`/api/fixedExpense?userId=${await initUserId()}`, {
    method: "GET",
  });
  const categoryObj = await res.json();
  const categoryArr = Object.keys(categoryObj.fixedExpense).map((key) => ({
    category: key,
    cost: categoryObj.fixedExpense[key],
  }));
  console.log(categoryArr);
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
      target,
    };
  });
  return differences;
}

export async function getIncome() {
  //const userId = await getUserID();
  const res = await fetch(`/api/income?userId=${await initUserId()}`, {
    method: "GET",
  });
  const data = await res.json();
  return data;
}

export async function setIncome(income: string) {
  //const userId = await getUserID();
  const data = { income: income };
  const res = await fetch(`/api/income?userId=${await initUserId()}`, {
    method: "POST",
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function postBudgetCategoryAPI(data: any) {
  //const userId = await getUserID();
  const response = await fetch(`/api/budget?userId=${await initUserId()}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...data, amount: parseFloat(data.amount) }),
  });
  const updatedDocument = await response.json();
  return updatedDocument;
}

export async function addExpense(data: {
  type: string;
  descr: string;
  amount: number;
}) {
  const userId = await getUserID();
  const formattedData = {
    ...data,
    owner: userId,
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

export async function deleteTransaction(data: any) {
  //const userId = await getUserID();
  const response = await fetch(
    `/api/deleteTransaction?userId=${await initUserId()}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  return response.json();
}

export async function deleteCategory(data: any) {
  //const userId = await getUserID();
  const response = await fetch(
    `/api/deleteBudgetCategory?userId=${await initUserId()}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  return response.json();
}

export async function postFixedExpense(data: {
  category: string;
  cost: number;
}) {
  console.log(data);
  const userId = await getUserID();
  const response = await fetch(`/api/fixedExpense?userId=${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function deleteFixedExpense(data: any) {
  //const userId = await getUserID();
  const response = await fetch(`/api/deleteFixedExpense?userId=${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

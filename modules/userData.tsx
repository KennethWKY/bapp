import { useUser } from "@auth0/nextjs-auth0/client";

export async function createUser() {
  const userId = await getUserID();
  const userName = await getUserName();
  const monthlyBudget = {};
  const fixedExpense = {};
  const income = 0;
  const userData = {
    userId: userId,
    userName: userName,
    monthlyBudget: monthlyBudget,
    fixedExpense: fixedExpense,
    income: income,
  };
  try {
    const response = await fetch("/api/account/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...userData }),
    });
    const data = await response.json();
    return data;
  } catch {
    (error: any) => console.log(error);
  }
}

export async function checkUserExist(userId: any) {
  const res = await fetch(`/api/account/exist?userId=${userId}`, {
    method: "GET",
  });
  const data = await res.json();
  return data;
}

//Get current logged in userId
export async function getUserID() {
  const res = await fetch("/api/auth/me", {
    method: "GET",
  });
  const data = await res.json();
  const userId = data.sub.split("|")[1];

  return userId;
}

export async function getUserName() {
  const res = await fetch("/api/auth/me", {
    method: "GET",
  });
  const data = await res.json();
  const userName = data.name;

  return userName;
}

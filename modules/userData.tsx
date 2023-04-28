import { useUser } from "@auth0/nextjs-auth0/client";

export function getUserName(): string | undefined {
  const { user } = useUser();
  if (user?.name) {
    const userName = user?.name;
    return userName;
  }
  return undefined;
}

export async function createUser(userid: any, username: any) {
  const userId = userid;
  const userName = username;
  const monthlyBudget = {};
  const income = null;
  const userData = {
    userId: userId,
    userName: userName,
    monthlyBudget: monthlyBudget,
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

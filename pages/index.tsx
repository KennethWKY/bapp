import Head from "next/head";
import clientPromise from "../lib/mongodb";
import { InferGetServerSidePropsType } from "next";
import AddBudgetCategory from "../components/AddBudgetCategory";
import MonthlyExpense from "../components/MonthlyExpense";
import AddExpense from "../components/AddExpense";
import SetIncome from "../components/SetIncome";
import { useState } from "react";
import Link from "next/link";

export async function getServerSideProps() {
  try {
    await clientPromise;
    // `await clientPromise` will use the default database passed in the MONGODB_URI
    // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
    //
    // `const client = await clientPromise`
    // `const db = client.db("myDatabase")`
    //
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands

    return {
      props: { isConnected: true },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
}

export default function Home({
  isConnected,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [activeButton, setActiveButton] = useState(0);

  return (
    <div className="flex flex-col items-center">
      <div className="bg-white shadow-lg rounded-lg px-8 py-6 sm:max-w-md sm:w-full">
        <div className="text-3xl text-green-600 mb-4">Budger Gur</div>

        <AddBudgetCategory />

        <AddExpense />

        <SetIncome />

        <MonthlyExpense />
      </div>
    </div>
  );
}

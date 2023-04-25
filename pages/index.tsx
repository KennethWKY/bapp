import Head from "next/head";
import clientPromise from "../lib/mongodb";
import { InferGetServerSidePropsType } from "next";
import Link from "next/link";
import BottomNav from "../components/BottomNav";
import Skeleton from "../components/Skeleton";

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
  return (
    <div className="flex flex-col items-center">
      <div className="bg-white shadow-lg rounded-lg px-8 py-6 sm:max-w-md sm:w-full">
        <div className="text-3xl text-green-600 mb-4">Budget Gur</div>
        Welcome
        <div className="flex flex-col items-center">
          <svg
            width="150px"
            height="150px"
            viewBox="0 0 36 18"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            className="iconify iconify--twemoji"
            preserveAspectRatio="xMidYMid meet"
          >
            <path
              fill="#F4900C"
              d="M3 9C3 0 10.387 0 19.499 0c9.113 0 16.5 0 16.5 9s-7.387 9-16.5 9C10.387 18 3 18 3 9z"
            ></path>
            <path
              fill="#662113"
              d="M11.414 1.585c-.267-.267-.797-.197-1.355.12c-3.3-2.732-8.653-3.652-8.895-3.692a1 1 0 0 0-.329 1.972c.053.009 4.934.854 7.821 3.16c-.275.525-.324 1.015-.07 1.268c.39.391 1.34.074 2.121-.707c.781-.78 1.097-1.73.707-2.121z"
            ></path>
            <path
              fill="#5C913B"
              d="M21 0s-3.106 4.318-7.021 5.273C11 6 7.041 6.07 6.646 5.15c-.394-.919 1.572-3.937 4.969-5.393C15.012-1.698 21 0 21 0z"
            ></path>
          </svg>
        </div>
        <BottomNav />
      </div>
    </div>
  );
}

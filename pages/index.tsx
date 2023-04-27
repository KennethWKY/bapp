import Head from "next/head";
import clientPromise from "../lib/mongodb";
import { InferGetServerSidePropsType } from "next";
import BottomNav from "../components/BottomNav";
import { useUser } from "@auth0/nextjs-auth0/client";
import CreateUser from "../components/CreateUser";

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
  const { user, isLoading } = useUser();

  return (
    <div>
      <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="flex flex-col max-w-md mx-auto p-6 rounded-lg shadow-lg bg-white">
          <div className="flex justify-between">
            <div className="text-3xl text-green-600">Budget Gur</div>
            {user && (
              <a
                href="/api/auth/logout"
                className="block text-center bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
              >
                Logout
              </a>
            )}
          </div>
          {user && (
            <p className="text-xl text-gray-500 mt-4">Welcome {user?.name}</p>
          )}
          {!user && (
            <a
              href="/api/auth/login"
              className="mt-4 block text-center bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
            >
              Login
            </a>
          )}
          {user && (
            <div className="flex flex-col items-center mt-4">
              <CreateUser />
              <BottomNav />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

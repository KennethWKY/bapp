import Head from "next/head";
import BottomNav from "../components/BottomNav";
import { useUser } from "@auth0/nextjs-auth0/client";
import CreateUser from "../components/CreateUser";
import { checkUserExist } from "../modules/userData";
import { useEffect, useState } from "react";

export default function Home() {
  const [userExist, setUserExist] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    async function checkExist() {
      try {
        const data = await checkUserExist(user?.sub?.split("|")[1]);
        console.log(data.result);
        if (data.result == null) {
          setUserExist(false);
        } else {
          setUserExist(true);
        }
      } catch (err) {
        console.log(err);
      }
    }

    if (user) {
      checkExist();
    }
  }, [user]);

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

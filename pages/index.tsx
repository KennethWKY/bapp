import Head from "next/head";
import clientPromise from "../lib/mongodb";
import { InferGetServerSidePropsType } from "next";
import BottomNav from "../components/BottomNav";
import { useUser } from "@auth0/nextjs-auth0/client";
import CreateUser from "../components/CreateUser";

export default function Home() {
  // const [isConnected, setIsConnected] = useState(false);
  const { user } = useUser();

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       await clientPromise;
  //       setIsConnected(true);
  //     } catch (e) {
  //       console.error(e);
  //       setIsConnected(false);
  //     }
  //   }

  //   fetchData();
  // }, []);

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

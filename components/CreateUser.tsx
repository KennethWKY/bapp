import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useState } from "react";
import { checkUserExist, createUser } from "../modules/userData";
import { error } from "console";

export default function CreatUser() {
  const { user } = useUser();
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [userName, setUserName] = useState<string | undefined>(undefined);
  const [userExist, setUserExist] = useState(false);

  async function handleCreateUser() {
    if (user?.sub != undefined) {
      try {
        await createUser();
        setUserExist(true);
      } catch {
        (error: any) => console.log(error);
      }
    }
  }

  useEffect(() => {
    async function checkExist() {
      try {
        const data = await checkUserExist(user?.sub?.split("|")[1]);
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
      {userExist == false ? (
        <button
          onClick={() => handleCreateUser()}
          className=" block text-center bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
        >
          Create Account
        </button>
      ) : (
        <div></div>
      )}
    </div>
  );
}

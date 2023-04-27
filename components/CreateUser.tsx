import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useState } from "react";
import { checkUserExist, createUser } from "../modules/userData";

export default function AccountPage() {
  const { user } = useUser();
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [userName, setUserName] = useState<string | undefined>(undefined);
  const [userExist, setUserExist] = useState(false);

  async function sendCreateUserRequest() {
    createUser(userId, userName);
  }

  function handleCreateUser() {
    setUserId(user?.sub?.split("|")[1]);
    setUserName(user?.name ?? undefined);
    sendCreateUserRequest();
  }

  useEffect(() => {
    if (user) {
      try {
        checkUserExist(user?.sub?.split("|")[1]).then((result) => {
          if (result) {
            setUserExist(true);
          }
        });
      } catch (err) {
        console.log(err);
      }
    }
  }, []);

  //   if (!userExist) {
  //     setUserId(user?.sub?.split("|")[1]);
  //     setUserName(user?.name ?? undefined);
  //     sendCreateUserRequest();
  //   }
  // }, []);

  return (
    <div>
      {!userExist && (
        <button onClick={() => handleCreateUser()}>Create Account</button>
      )}
    </div>
  );
}

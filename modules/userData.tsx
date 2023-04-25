import { useUser } from "@auth0/nextjs-auth0/client";

export function getUserId(): string | undefined {
  const { user } = useUser();
  return user?.sub ?? undefined;
}

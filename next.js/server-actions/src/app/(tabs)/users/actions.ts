import { getSession } from "@/utils/session";
import { redirect } from "next/navigation";

export const logOut = async () => {
  "use server";
  const session = await getSession();
  session.destroy();
  redirect("/");
};

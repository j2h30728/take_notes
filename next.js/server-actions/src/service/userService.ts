import { notFound } from "next/navigation";

import db from "@/utils/db";
import { getSession } from "@/utils/session";

export async function getUserInfoBySession() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });
    if (user) {
      return user;
    }
  }
  notFound();
}

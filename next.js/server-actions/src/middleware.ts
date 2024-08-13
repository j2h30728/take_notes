import { getSession } from "@/utils/session";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const session = await getSession();

  if (
    req.nextUrl.pathname === "/intro" ||
    req.nextUrl.pathname.startsWith("/create-account") ||
    req.nextUrl.pathname.startsWith("/log-in")
  ) {
    if (session.id) {
      return NextResponse.redirect(new URL("/", req.url));
    } else {
      return NextResponse.next();
    }
  }

  if (!session.id && !req.nextUrl.pathname.startsWith("/intro")) {
    return NextResponse.redirect(new URL("/intro", req.url));
  }
}
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

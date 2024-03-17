import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  console.log(request);

  if (request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.rewrite(new URL('/admin-2', request.url))
  }
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

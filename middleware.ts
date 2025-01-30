import { NextResponse } from "next/server";
import config from "./config";
import { NextRequest } from "next/server";

let clerkMiddleware: (arg0: (auth: any, req: any) => any) => {
    (arg0: any): any;
    new (): any;
  },
  createRouteMatcher;

if (config.auth.enabled) {
  try {
    ({ clerkMiddleware, createRouteMatcher } = require("@clerk/nextjs/server"));
  } catch (error) {
    console.warn("Clerk modules not available. Auth will be disabled.");
    config.auth.enabled = false;
  }
}

const isProtectedRoute = config.auth.enabled
  ? createRouteMatcher(["/dashboard(.*)"])
  : () => false;

export default function middleware(req: NextRequest) {
  // Allow public files to be accessed directly
  if (
    req.nextUrl.pathname.startsWith("/_next") ||
    req.nextUrl.pathname.startsWith("/images/") ||
    req.nextUrl.pathname.match(/\.(jpg|jpeg|png|gif|ico|svg)$/)
  ) {
    return NextResponse.next();
  }

  if (config.auth.enabled) {
    return clerkMiddleware(async (auth, req) => {
      const resolvedAuth = await auth();

      if (!resolvedAuth.userId && isProtectedRoute(req)) {
        return resolvedAuth.redirectToSignIn();
      } else {
        return NextResponse.next();
      }
    })(req);
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|images|favicon.ico).*)",
    "/(api|trpc)(.*)",
  ],
};

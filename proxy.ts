import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isAdminRoute(req)) {
    // Protect the route first (ensures user is signed in)
    await auth.protect();

    // Check for admin role
    // Note: You must configure Custom Claims in your Clerk Dashboard to include 'role' in session token
    const { sessionClaims } = await auth();

    // Check if role is admin (adjust property path based on your Clerk setup, typically metadata.role or just role)
    // For this implementation we assume publicMetadata.role or similar custom claim
    const role = (sessionClaims?.metadata as any)?.role;

    if (role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};

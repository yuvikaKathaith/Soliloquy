import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import arcjet, { createMiddleware, detectBot, shield, rateLimit } from "@arcjet/next";
import { NextResponse } from "next/server";

// Protected routes that require authentication
const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/journal(.*)",
  "/collection(.*)",
]);

// Create Arcjet middleware with security + rate limiting
const aj = arcjet({
  key: process.env.ARCJET_KEY,
  rules: [
    // Shield protection for security threats
    shield({
      mode: "LIVE",
    }),

    // Bot detection (allow only legit search engines)
    detectBot({
      mode: "LIVE",
      allow: ["CATEGORY:SEARCH_ENGINE"],
    }),

    // Rate limiting to prevent abuse (adjust as needed)
    rateLimit({
      mode: "LIVE",
      window: "1m", // 1 minute window
      max: 5, // Allow 5 create/update requests per minute per user
      match: [
        "/api/journal(.*)",
        "/api/collection(.*)",
      ],
    }),
  ],
});

// Clerk middleware for authentication
const clerk = clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn } = await auth();

  // Protect routes — redirect if unauthenticated
  if (!userId && isProtectedRoute(req)) {
    return redirectToSignIn();
  }

  return NextResponse.next();
});

// Combine both: Arcjet runs first, then Clerk
const combinedMiddleware = createMiddleware(aj, async (auth, req) => {
  const result = await clerk(auth, req);

  // If Arcjet blocked the request, handle it gracefully
  if (result?.status === 429) {
    return new NextResponse(
      JSON.stringify({
        error: "Too many requests. Please try again later.",
      }),
      {
        status: 429,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  return result;
});

export default combinedMiddleware;

// Matcher configuration (keeps internal/static files excluded)
export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};

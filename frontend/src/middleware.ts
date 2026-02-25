import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher(["/", "/sign-in(.*)", "/sign-up(.*)"]);

// 1. Ajoute 'async' devant la fonction
export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    // 2. Utilise 'await' devant auth.protect()
    // Note : Dans la v5+, on appelle souvent protect() directement sur l'objet auth fourni
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};

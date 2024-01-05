import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/middleware";

function redirectToHome(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.pathname = "/";
  url.search = "";
  return NextResponse.redirect(url);
}

function redirectToLanding(request: NextRequest) {
  const url = new URL(request.url);
  url.pathname = "/landing";
  return NextResponse.redirect(url);
}

function redirectToOnboarding(request: NextRequest) {
  const url = new URL(request.url);
  url.pathname = "/onboarding";
  return NextResponse.redirect(url);
}

export async function middleware(request: NextRequest) {
  try {
    // This `try/catch` block is only here for the interactive tutorial.
    // Feel free to remove once you have Supabase connected.
    const { supabase, response } = createClient(request);

    // Refresh session if expired - required for Server Components
    // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-session-with-middleware
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    const pathname = request.nextUrl.pathname;

    if (session) {
      const user_id = session.user.id;
      const { data: userDetails } = await supabase
        .from("user_details")
        .select("")
        .eq("id", user_id);
      if (
        pathname != "/onboarding" &&
        (!userDetails || userDetails.length === 0)
      ) {
        return redirectToOnboarding(request);
      }
      if (pathname === "/onboarding" && userDetails && userDetails.length > 0) {
        return redirectToHome(request);
      }
    }

    if (session && pathname === "/landing") {
      return redirectToHome(request);
    }

    if (!session && pathname != "/landing") {
      return redirectToLanding(request);
    }

    return response;
  } catch (e) {
    // If you are here, a Supabase client could not be created!
    // This is likely because you have not set up environment variables.
    // Check out http://localhost:3000 for Next Steps.
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};

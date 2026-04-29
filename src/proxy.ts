import { NextResponse, type NextRequest } from "next/server";
import { auth } from "@/lib/auth";

export default async function proxy(request: NextRequest) {
    // Full session validation using Node.js runtime
    const session = await auth.api.getSession({ headers: request.headers });
    
    console.log("[Proxy Auth Debug] Path:", request.nextUrl.pathname);
    console.log("[Proxy Auth Debug] Session details:", session ? `User ID: ${session.user?.id}` : "No session found");

    if (!session) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
    }
    
    return NextResponse.next();
}

export const config = {
    runtime: "nodejs",
    matcher: ["/dashboard", "/dashboard/:path*"],
};

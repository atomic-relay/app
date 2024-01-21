import { authMiddleware } from "@clerk/nextjs";
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware

export default authMiddleware({
	publicRoutes: ["/", "/confirmation", "/invoices", "/contacts"],
});

export const config = {
	matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/",  "/(api|trpc)(.*)"],
};

export async function middleware(req: NextRequest) {
	const res = NextResponse.next()
	// const supabase = createMiddlewareClient({ req, res })
	//
	// const {
	// 	data: { user },
	// } = await supabase.auth.getUser()
	//
	// // if user is signed in and the current path is / redirect the user to /account
	// if (user && req.nextUrl.pathname === '/') {
	// 	return NextResponse.redirect(new URL('/account', req.url))
	// }
	//
	// // if user is not signed in and the current path is not / redirect the user to /
	// if (!user && req.nextUrl.pathname !== '/') {
	// 	return NextResponse.redirect(new URL('/', req.url))
	// }
	return res
}

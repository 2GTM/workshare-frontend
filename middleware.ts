"use server";
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { validateToken } from './services/AuthService';

export async function middleware(request: NextRequest) {
	// console.log(request.cookies);
	// console.log(request.url);
	// console.log(request.nextUrl.pathname);
	const pathname = request.nextUrl.pathname;
	const token = request.cookies.get("token");

	if (token) {
		const isTokenValid = (await validateToken(token.value)).data;
		console.log(isTokenValid);

		if (isTokenValid) {
			if (pathname.startsWith("/login") || pathname.startsWith("/signup")) {
				return NextResponse.redirect(new URL("/", request.url));
			}

			else return NextResponse.next();
		} 
		
		else {
			let response = NextResponse.redirect(new URL("/login", request.url));
			response.cookies.delete("token");
			return response;
		}
	} 
	
	else {
		if (pathname.startsWith("/login") || pathname.startsWith("/signup")) {
			return NextResponse.next();
		}
		
		else return NextResponse.redirect(new URL("/login", request.url));
	}
}

export const config = {
	matcher: [
		"/login",
		"/signup",
		"/projects/new",
		"/projects/:id/edit",
	],
  }
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { validateToken } from './services/AuthService';

export async function middleware(request: NextRequest) {
	console.log(request.cookies);
	console.log(request.url);
	console.log(request.nextUrl.pathname);
	const pathname = request.nextUrl.pathname;

	const token = request.cookies.get("token");

	if (token) {
		const isTokenValid = (await validateToken(token.value)).data;

		if (isTokenValid) {
			if (pathname.startsWith("/login") || pathname.startsWith("/signup")) {
				return NextResponse.redirect(new URL("/", request.url));
			}

			else return NextResponse.next();
		} 
		
		else {
			request.cookies.delete("token");
			return NextResponse.redirect(new URL("/login", request.url));
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
		"/signup"
	],
  }
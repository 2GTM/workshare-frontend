import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
    // var token = localStorage.getItem("token");

    // if(!token) {
    //     return NextResponse.redirect(new URL('/login', request.url))
    // }

}
 
export const config = {
  matcher: [
    '/update',
    "/login",
    "/sign-up"
],
}
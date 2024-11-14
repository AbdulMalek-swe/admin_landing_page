import { NextResponse } from 'next/server';
import { getToken } from './utils/helper';
const isLoggedIn = true;
export default async function middleware(req) { 
  // req.NextResponse.
  const publicRoute = ["/dashboard","/blog","/faq", "/project","/company","/testimonial","/contact","category"];
  const token  =  req.cookies.get('token')?.value?true:false;
  if(token && publicRoute.includes(req.nextUrl.pathname)  ){
    console.log("protected route",req.nextUrl.pathname);
    return NextResponse.next();
  }
 
  return NextResponse.redirect(new URL("/auth/log-in",req.url))
}

// Matcher configuration
export const config = {
  // matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
  matcher: [
    '/dashboard/:path*',   
     // Protects all paths under /dashboard
    
   
   // Protects all paths under /blog
  //  '/:path*', // Protects all paths under /blog
  //  "/((?!^$).*)",
    // matcher: 
    // '/((?!api|static|.*\\..*|_next).*)'
  ],
};

import { NextResponse } from "next/server";

export default async function middleware(req) {
  const publicRoutes = [
    "/dashboard",
    "/blog",
    "/faq",
    "/project",
    "/company",
    "/testimonial",
    "/contact",
    "/category",
    "/auth/log-in",
  ];

  const token = !!req.cookies.get("zanvision_lab_landing_token")?.value;
  const pathname = req.nextUrl.pathname;
  //  if token and pathname is valid then it redirectexpected path 
  if (token || publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  console.log("Redirecting to login page with pathname:-----", pathname);
//  set query to path what it go to expected route 
  const redirectUrl = new URL(`/auth/log-in`, req.url);
  if (pathname !== "/") {
    redirectUrl.searchParams.set("pathname", pathname);  
  }
  return NextResponse.redirect(redirectUrl);
}
 
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],  
};

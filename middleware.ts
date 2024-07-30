export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/((?!api|signin|signout|_next/static|_next/image|favicon.ico).*)"],
};
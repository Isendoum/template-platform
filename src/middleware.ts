export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/platform/:path*"],
  // matcher: ["/((?!register|api|login).*)"],
};

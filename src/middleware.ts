export { default } from "next-auth/middleware";

export const config = {
   matcher: ["/platform/:path*", "/api/user/:path*"],
   // matcher: ["/((?!register|api|login).*)"],
};

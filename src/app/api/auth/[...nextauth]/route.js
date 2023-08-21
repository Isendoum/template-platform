import { authOptions } from "@/lib/auth";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);

// export async function GET(req, res) {
//   return await handler(req, res);
// }

// export async function POST(req, res) {
//   return await handler(req, res);
// }
export { handler as GET, handler as POST };

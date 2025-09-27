import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

const handler = NextAuth(authOptions);
console.log("authOptions at runtime:", authOptions);
export { handler as GET, handler as POST };

import { authConfig } from "@/helper/auth";
import NextAuth from "next-auth";

// console.log("Providers in authConfig:", authConfig.providers);

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };
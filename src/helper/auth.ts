// "use client"

import { NextAuthOptions, getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/Models/userModel";
import bcrypt from 'bcryptjs'

interface CustomJWT extends Record<string, unknown> {
    accessToken?: string;
    id?: string;
}
interface CustomSession {
    user?: {
        id?: string;
        name?: string | null;
        email?: string | null;
        image?: string | null;
        accessToken?: string;
    };
    expires: string;
}
export const authConfig: NextAuthOptions = {
    providers: [
        // CredentialsProvider({
        //     name: "Credentials",
        //     credentials: {
        //         email: {
        //             label: "Email",
        //             type: "email",
        //             placeholder: "example@example.com",
        //         },
        //         password: { label: "Password", type: "password" },
        //     },
        //     async authorize(credentials) {
        //         await connect();
        //         if (!credentials || !credentials.email || !credentials.password){
        //             console.log("heeueue")
        //             return null;
        //         }
        //         console.log("hello")
        //         const user = await User.findOne({ email: credentials.email });
        //         if (!user) return null;
        //         const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
        //         if (!isPasswordCorrect) return null;

        //         return {
        //             id: user._id.toString(),
        //             name: user.name,
        //             email: user.email,
        //         };
        //     },
        // }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string, 
            authorization: {
                params: {
                    redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/callback/github`,
                },
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user, account, profile, session }): Promise<CustomJWT> {
            console.log("token: ", token, "user: ", user, "account: ", account, "session: ", session);
            return token
        },
        async session({ session, user, token }): Promise<CustomSession> {
            console.log("sesssionssssssss: ", session, token)
            return session
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt",
    },
};

// export async function loginIsRequiredServer() {
//     const session = await getServerSession(authConfig);
//     if (!session) return redirect("/");
// }

// export function loginIsRequiredClient() {
//     if (typeof window !== "undefined") {
//         const session = useSession();
//         const router = useRouter();
//         if (!session) router.push("/");
//     }
// }
// "use client"

import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/Models/userModel";

interface CustomJWT extends Record<string, unknown> {
    accessToken?: string;
    id?: string;
}

export const authConfig: NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
            authorization: {
                params: {
                    redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/callback/github`,
                    scope: 'repo,user',
                },
            },
        }),
    ],
    callbacks: {
        async jwt({ token, account, user }): Promise<CustomJWT> {
            if (account?.access_token) {
                token.accessToken = account.access_token;
            }
            await connect()
            if (user) {
                const res = await User.findOne({ email: user.email })
                console.log("resss",res)
                if (!res) {
                    console.log("userrrr",user)
                    const newUser = await User.create({
                        name: user.name,
                        email: user.email,
                        image: user.image,
                        accessToken: account?.access_token,
                        provider: account?.provider,
                    });
                    await newUser.save();
                    token.id = newUser._id.toString(); 
                }
                else{
                    token.id = res._id.toString();
                }

            }
            return token;
        },
        async session({ session, token }) {
            session.user = {
                ...session.user,
                access_token: token.accessToken as string,
                id: token.id as string,  // or add fallback
            };
            return session;
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
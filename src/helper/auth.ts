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
            profile(profile) {
                console.log(profile)
                return {
                  id: profile.id,
                  name: profile.name || profile.login,
                  email: profile.email,
                  image: profile.avatar_url,
                  username: profile.login,
                  avatar_url: profile.avatar_url,

                };
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
                token.username = user.username
                token.avatar_url = user.avatar_url
                // token.username = user.username as string
                const res = await User.findOne({ email: user.email })
                // console.log("resss",res)
                if (!res) {
                    // console.log("userrrr",token)
                    const newUser = await User.create({
                        name: user.name,
                        username: user.username,
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
                id: token.id as string, 
                username : token.username as string,
                avatar_url: token.avatar_url as string
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
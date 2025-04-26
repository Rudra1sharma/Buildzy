import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get('code');

    if (!code) return NextResponse.json({ error: 'No code provided' }, { status: 400 });

    try {
        const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
                client_secret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET,
                code,
            }),
        });

        const tokenData = await tokenRes.json();
        const accessToken = tokenData.access_token; // Log just first few chars for security

        const userRes = await fetch('https://api.github.com/user', {
            headers: {
                Authorization: `token ${accessToken}`,
                'Accept': 'application/vnd.github.v3+json',
            },
        });

        const user = await userRes.json();

        //! Listen Rudra here save the user along with its access token in databaaase.
        //* Watch Out that the user object must have all the required keys
        const redirectTo = new URL('/dashboard', req.url);
        return NextResponse.redirect(redirectTo);
    } catch (error: any) {
        console.log(error)
        return NextResponse.json(error, { status: 500 })
    }
}
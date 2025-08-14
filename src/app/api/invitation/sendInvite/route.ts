import { connect } from '@/dbConfig/dbConfig';
import User from '@/Models/userModel';
import { NextRequest, NextResponse } from 'next/server';


export async function POST(req: NextRequest) {
    if (req.method !== 'POST') {
        return NextResponse.json({ error: "Invalid HTTPS method", status: 405 });
    }
    try {
        await connect();
        const { collaboratorEmail, projectId } = await req.json();
        const res = await User.findOne({ email: collaboratorEmail });
        if (!res) {
            return NextResponse.json({ message: "Ask Collaborator to create an account on Buildzyy" }, { status: 202 })
        }
        const owner_id = res._id;
        await User.findByIdAndUpdate(owner_id, {
            $push: {
                projects: projectId
            }
        });
        return NextResponse.json({ username: res.username }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: "Internal server error at accept Invite" }, { status: 500 });
    }
}

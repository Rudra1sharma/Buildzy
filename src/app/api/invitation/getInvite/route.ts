import { connect } from "@/dbConfig/dbConfig"
import Invitation from "@/Models/invitationModel";
import User from "@/Models/userModel";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
    if (req.method !== 'GET') {
        return NextResponse.json({ error: "Invalid HTTPS method", status: 405 });
    }
    try {
        connect();
        const url = new URL(req.url);
        const userid = url.searchParams.get("id");
        const user = await User.findById(userid);
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        const invitationIds = user.invitations
        if(!invitationIds || invitationIds.length === 0){
            return NextResponse.json({invitations: [], status: 200})
        }
        const invitations = await Invitation.find({_id : {$in: invitationIds}})

        const invites = invitations.map((invite, index)=>({
            ...invite.toObject(), id:index+1,
        }))
        return NextResponse.json({invitations: invites, status: 200})
    } catch (error) {
        return NextResponse.json(
            { error: "Internal Server Error at getting Invite" },
            { status: 500 }
        );
    }
}
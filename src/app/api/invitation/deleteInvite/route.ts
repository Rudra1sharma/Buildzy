import {connect} from '@/dbConfig/dbConfig'; 
import Invitation from '@/Models/invitationModel';
import User from '@/Models/userModel';
import Team from '@/Models/teamModel';
import { NextRequest, NextResponse } from 'next/server';


export async function DELETE(req: NextRequest, res:NextResponse){
    if(req.method !== 'DELETE'){
        return NextResponse.json({error: "Invalid HTTPS method", status: 405});
    }
    try {
        await connect();
        const url = new URL(req.url);
        const userId = url.searchParams.get("userid");
        const invitationId = url.searchParams.get("invitationId")
        //find invitation
        const invitation =await Invitation.findById(invitationId);
        if(!invitation){
            return NextResponse.json({message: "Invitation Not Found", status: 404});
        }
        await Invitation.findByIdAndDelete(invitationId);

        await User.findByIdAndUpdate(userId, {
            $pull:{invitations: invitationId}
        })

        await Team.findByIdAndUpdate(invitation.team, {
            $pull:{invitations: invitationId}
        })

        return NextResponse.json({message: "Invitation Deleted Successfully"}, {status: 200});

    } catch (error) {
        return NextResponse.json({error: "Internal server error at accept Invite"}, {status: 500});
    }
}

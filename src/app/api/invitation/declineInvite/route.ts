import {connect} from '@/dbConfig/dbConfig'; 
import Invitation from '@/Models/invitationModel';
import { NextRequest, NextResponse } from 'next/server';


export async function POST(req: NextRequest, res:NextResponse){
    if(req.method !== 'POST'){
        return NextResponse.json({error: "Invalid HTTPS method", status: 405});
    }
    try {
        await connect();
        const {userId, invitationId} = await req.json();
        //find invitation
        const invitation =await Invitation.findById(invitationId);
        if(!invitation){
            return NextResponse.json({message: "Invitation Not Found", status: 404});
        }
        //check user is reciever
        if(invitation.inviter.toString() === userId){
            return NextResponse.json({message: "Non-Authorized to decline the invite", status:403});
        }
        //already accepted or declined
        if(invitation.status !== "pending"){
            return NextResponse.json({message: `Already ${invitation.status}`, status:400})
        }
        //accept the invitation
        invitation.status = "declined";
        await invitation.save();

        return NextResponse.json({message: "Invitation Declined Successfully"}, {status: 200});

    } catch (error) {
        return NextResponse.json({error: "Internal server error at accept Invite"}, {status: 500});
    }
}

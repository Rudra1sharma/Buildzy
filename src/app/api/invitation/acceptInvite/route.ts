import {connect} from '@/dbConfig/dbConfig'; 
import Invitation from '@/Models/invitationModel';
import User from '@/Models/userModel';
import Team from '@/Models/teamModel';
import { NextRequest, NextResponse } from 'next/server';


export async function POST(req: NextRequest, res:NextResponse){
    if(req.method !== 'POST'){
        return NextResponse.json({error: "Invalid HTTPS method", status: 405});
    }
    await connect();
    try {
        const {userid, invitationId} = await req.json();
        // console.log(userid, " ", invitationId)
        //find invitation
        const invitation = await Invitation.findOne({_id: invitationId});       
        if(!invitation){
            return NextResponse.json({message: "Invitation Not Found", status: 404});
        }
        //check user is reciever
        if(invitation.inviter.toString() === userid){
            return NextResponse.json({message: "Non-Authorized to accept the invite", status:403});
        }
        //already accepted or declined
        if(invitation.status !== "pending"){
            return NextResponse.json({message: "Already processed", status:400})
        }
        //find user and add the team
        const user = await User.findById(userid);
        if(!user){
            return NextResponse.json({message: "User not found"}, {status: 404});
        }
        user.teams.push(invitation.team);

        //find the team and update the team members
        const team = await Team.findById(invitation.team);
        if(!team){
            return NextResponse.json({message: "Team not found"}, {status: 404});
        }
        team.Members.push({userid});

        await team.save();
        await user.save();
        //accept the invitation
        invitation.status = "accepted";
        await invitation.save();

        return NextResponse.json({message: "Invitation Accepted Successfully"}, {status: 200});

    } catch (error) {
        return NextResponse.json({error: "Internal server error at accept Invite"}, {status: 500});
    }
}

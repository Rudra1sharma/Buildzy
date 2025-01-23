import {connect} from '@/dbConfig/dbConfig'; 
import Invitation from '@/Models/invitationModel';
import User from '@/Models/userModel';
import Team from '@/Models/teamModel';
import { findSourceMap } from 'module';
import { NextRequest, NextResponse } from 'next/server';
import { doesMemberExist } from '@/helper/doesMemberExist';


export async function POST(req: NextRequest){
    if(req.method !== 'POST'){
        return NextResponse.json({error: "Invalid HTTPS method", status: 405});
    }
    try {
        await connect();
        const {receiverUsername, teamId, inviterId} = await req.json();
        if (!inviterId || !receiverUsername || !teamId) {
            return NextResponse.json({ message: 'Missing required fields' }, {status: 400});
        }

        //check reciever exist
        const receiver = await User.findOne({username: receiverUsername});
        if(!receiver){
            return NextResponse.json({message: 'Please enter the correct member username'}, {status: 404});
        }
        //check the reciever already exist in team
        const team = await Team.findById(teamId);
        if(!team){
            return NextResponse.json({message: 'Team not found'},{status: 404});
        }
        if(doesMemberExist(team.Members, receiver._id)){
            return NextResponse.json({message: 'User already in team'}, {status: 400});
        }
        // create a new Invitation
        const invitation = new Invitation({
            receiver: receiver._id,
            team:teamId,
            inviter: inviterId
        })
        const invite = await invitation.save();

        //update user model
        await User.findByIdAndUpdate(receiver._id, {
            $push:{invitations: invite._id}
        })

        //update team model
        await Team.findByIdAndUpdate(teamId, {
            $push:{invitations: invite._id}
        })

        return NextResponse.json({message: "Invite Send Successfully"}, {status: 200});

    } catch (error) {
        return NextResponse.json({error: "Internal server error at accept Invite"}, {status: 500});
    }
}

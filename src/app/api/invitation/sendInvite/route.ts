import {connect} from '@/dbConfig/dbConfig'; 
import Invitation from '@/Models/invitationModel';
import User from '@/Models/userModel';
import Team from '@/Models/teamModel';
import { findSourceMap } from 'module';


export default async function handler(req: Request, res:Response){
    if(req.method !== 'POST'){
        return Response.json({error: "Invalid HTTPS method", status: 405});
    }
    try {
        await connect();
        const {receiverUsername, teamId, senderId} = await req.json();
        if (!senderId || !receiverUsername || !teamId) {
            return Response.json({ message: 'Missing required fields' }, {status: 400});
        }

        //check reciever exist
        const receiver = await User.findOne({username: receiverUsername});
        if(!receiver){
            return Response.json({message: 'Please enter the correct reciever username'}, {status: 404});
        }
        //check the reciever already exist in team
        const team = await Team.findById(teamId);
        if(!team){
            return Response.json({message: 'Team not found'},{status: 404});
        }
        if(team.Members.includes(receiver._id)){
            return Response.json({message: 'User already in team'}, {status: 400});
        }
        //create a new Invitation
        const invitation = new Invitation({
            receiver: senderId,
            team:teamId
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

        return Response.json({message: "Invite Send Successfully"}, {status: 200});

    } catch (error) {
        return Response.json({error: "Internal server error at accept Invite"}, {status: 500});
    }
}

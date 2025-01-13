import {connect} from '@/dbConfig/dbConfig'; 
import Invitation from '@/Models/invitationModel';
import User from '@/Models/userModel';
import Team from '@/Models/teamModel';


export default async function handler(req: Request, res:Response){
    if(req.method !== 'DELETE'){
        return Response.json({error: "Invalid HTTPS method", status: 405});
    }
    try {
        await connect();
        const {userId, invitationId} = await req.json();
        //find invitation
        const invitation =await Invitation.findById(invitationId);
        if(!invitation){
            return Response.json({message: "Invitation Not Found", status: 404});
        }
        await Invitation.findByIdAndDelete(invitationId);

        await User.findByIdAndUpdate(userId, {
            $pull:{invitations: invitationId}
        })

        await Team.findByIdAndUpdate(invitation.team, {
            $pull:{invitations: invitationId}
        })

        return Response.json({message: "Invitation Deleted Successfully"}, {status: 200});

    } catch (error) {
        return Response.json({error: "Internal server error at accept Invite"}, {status: 500});
    }
}

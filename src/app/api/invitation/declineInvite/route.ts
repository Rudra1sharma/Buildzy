import {connect} from '@/dbConfig/dbConfig'; 
import Invitation from '@/Models/invitationModel';


export default async function handler(req: Request, res:Response){
    if(req.method !== 'POST'){
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
        //check user is reciever
        if(invitation.receiver.toString() === userId){
            return Response.json({message: "Non-Authorized to accept the invite", status:403});
        }
        //already accepted or declined
        if(invitation.status !== "pending"){
            return Response.json({message: "Already processed", status:400})
        }
        //accept the invitation
        invitation.status = "declined";
        await invitation.save();

        return Response.json({message: "Invitation Declined Successfully"}, {status: 200});

    } catch (error) {
        return Response.json({error: "Internal server error at accept Invite"}, {status: 500});
    }
}

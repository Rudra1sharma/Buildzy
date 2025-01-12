import {connect} from "@/dbConfig/dbConfig"
import User from "@/Models/userModel";
import { useState } from "react";


export async function GET(req: Request, res: Response){
    connect();
    try {
        const {invitations} = await req.json();
        const [invites, useInvite] = useState({});
        
    } catch (error) {
        
    }
}
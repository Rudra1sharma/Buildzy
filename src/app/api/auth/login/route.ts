import {connect} from "@/dbConfig/dbConfig";
import User from "@/Models/userModel";
import bcrypt from "bcryptjs";

export async function POST(req: Request, res: Response) {
    connect();  
    const {email, password}=await req.json();

    const user=await User.findOne({email});
    if(!user)
    {
        return Response.json({error:"User not found"},{status:404});
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if(!checkPassword)
    {
        return Response.json({error:"Invalid password"},{status:401});
    }

    return Response.json({message:"Login successful"},{status:200});
}
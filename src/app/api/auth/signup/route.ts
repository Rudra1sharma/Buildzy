import {connect} from "@/dbConfig/dbConfig";
import User from "@/Models/userModel";
import bcrypt from "bcryptjs";

export async function POST(req: Request, res: Response) {
    connect();

    try {
        const {name,username,email,password}=await req.json();
        
        const user = await User.findOne({email});
        if(user)
        {
            return Response.json({error:"Email already exists"},{status:400});
        }
        const user2 = await User.findOne({username});
        if(user2)
        {
            return Response.json({error:"Username already exists"},{status:400});
        }
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password,salt);

        const newuser = new User({name, username, email, password:passwordHash});
        await newuser.save();
        return Response.json({message:"New user created successfully"},{status:201});

    } catch (error) {
        console.log(error)
        return Response.json({error}, {status:500});
    }
}
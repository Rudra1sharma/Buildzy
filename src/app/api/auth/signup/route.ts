import {connect} from "@/dbConfig/dbConfig";
import User from "@/Models/userModel";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    connect();

    try {
        const formdata = await req.json();
        const {name,username,email,password}= formdata;
        
        const user = await User.findOne({email});
        if(user)
        {
            return NextResponse.json({message:"Email already exists", success: false},{status:400});
        }
        const user2 = await User.findOne({username});
        if(user2)
        {
            return NextResponse.json({message:"Username already exists",success:false},{status:400});
        }
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password,salt);

        const newuser = new User({name, username, email, password:passwordHash});
        await newuser.save();
        return NextResponse.json({message:"New user created successfully"},{status:201});

    } catch (error) {
        console.log(error)
        return NextResponse.json({error}, {status:500});
    }
}
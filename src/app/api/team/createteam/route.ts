import { connect } from '@/dbConfig/dbConfig';
import Team from '@/Models/teamModel'
import User from '@/Models/userModel';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

connect();
// create team
export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { teamName, description, leader } = reqBody;
        const newTeam = new Team({
            teamName,
            description,    
            leader,
            Members: [
                {
                    memberId: leader, 
                    joinedAt: new Date()
                },
            ],
        });
        if(!leader){
            return NextResponse.json({ message: "leader is required", success: false }, { status: 400 });
        }
        const newuser = await User.findByIdAndUpdate(leader,{$push:{teams: newTeam._id}},{new:true});
        await newTeam.save();
        return NextResponse.json({ message: "Team created 6successfully", team:newTeam,success:true }, { status: 201 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
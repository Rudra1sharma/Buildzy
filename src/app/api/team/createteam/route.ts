import { connect } from '@/dbConfig/dbConfig';
import Team from '@/Models/teamModel'
import User from '@/Models/userModel';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

// create team
export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { teamName, description, leader } = reqBody;
        const newTeam = new Team({
            teamName,
            description,
            leader,
            Members: [leader],
        });
        const newuser = await User.findByIdAndUpdate(leader,{$push:{teams: newTeam._id}},{new:true});
        await newTeam.save();
        return NextResponse.json({ message: "Course created successfully", team:newTeam,success:true }, { status: 201 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
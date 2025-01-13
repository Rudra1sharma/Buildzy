import { connect } from '@/dbConfig/dbConfig';
import Team from '@/Models/teamModel'
import User from '@/Models/userModel';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const TeamId = searchParams.get("Id");
        if (!TeamId) {
            return NextResponse.json({ message: "Team ID is required", success: false }, { status: 400 });
        }
        const team = await Team.findById(TeamId);
        if (!team) {
            return NextResponse.json({ message: "Team not found", success: false }, { status: 404 });
        }
        const users = team.Members
        for (const user of users) {
            await User.findByIdAndUpdate(
                user,
                {
                    $pull: {
                        teams: TeamId
                    },
                }
                ,{ new: true } 
            );
        }
        await team.deleteOne();
        return NextResponse.json({ message: "Team deleted successfully", team:team,success:true }, { status: 201 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
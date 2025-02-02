import { connect } from '@/dbConfig/dbConfig';
import Team from '@/Models/teamModel'
import User from '@/Models/userModel';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        console.log(searchParams)
        const TeamId = searchParams.get("teamId");
        const userId = searchParams.get("userId");
        if (!TeamId) {
            return NextResponse.json({ message: "Team ID is required", success: false }, { status: 400 });
        }
        if (!userId) {
            return NextResponse.json({ message: "User ID is required", success: false }, { status: 400 });
        }
        const team = await Team.findById(TeamId);
        const user = await User.findById(userId);
        if (!team) {
            return NextResponse.json({ message: "Team not found", success: false }, { status: 404 });
        }
        if (!user) {
            return NextResponse.json({ message: "User not found", success: false }, { status: 404 });
        }

        if (team.leader.toString() === userId) {
            if (team.Members.length === 0) {
              // If no members are left, delete the team
              await team.deleteOne();
              return NextResponse.json({ message: "Team deleted as no members are left", success: true }, { status: 200 });
            }
            else{
                const earliestMember = team.Members.sort((a:any, b:any) => new Date(a.joinedAt).getTime() - new Date(b.joinedAt).getTime())[0];
                team.leader = earliestMember.memberId;
                await team.save();
            }
        }

        await User.findByIdAndUpdate(
            user,
            {
                $pull: {
                    teams: TeamId
                },
            }
            , { new: true }
        );
        await Team.findByIdAndUpdate(team,
            {
                $pull:{
                    Members: { memberId: userId },
                }
            }
            ,{new:true}
        )
        return NextResponse.json({ message: "User left the team successfully", team: team, success: true }, { status: 201 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
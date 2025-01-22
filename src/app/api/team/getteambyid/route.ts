import { connect } from '@/dbConfig/dbConfig';
import Team from '@/Models/teamModel';
import User from '@/Models/userModel';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const teamId = searchParams.get('teamId');
        console.log(teamId)
        if (!teamId) {
            return NextResponse.json({ message: "Team ID is required", success: false }, { status: 400 });
        }

        const team = await Team.findById(teamId)

        if (!team) {
            return NextResponse.json({ message: "Team not found", success: false }, { status: 404 });
        }

        return NextResponse.json({ message: "Team fetched successfully", team: team, success: true }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
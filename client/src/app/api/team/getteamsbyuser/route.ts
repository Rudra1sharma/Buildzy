import { connect } from '@/dbConfig/dbConfig';
import Team from '@/Models/teamModel';
import User from '@/Models/userModel';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('teamId');

        if (!userId) {
            return NextResponse.json({ message: "User ID is required", success: false }, { status: 400 });
        }

        const user = await User.findById(userId)
        if (!user) {
            return NextResponse.json({ message: "User not found", success: false }, { status: 404 });
        }
        const teams = user.teams

        return NextResponse.json({ message: "Teams fetched successfully", teams: teams, success: true }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
import Project from "@/Models/projectModel";
import Team from "@/Models/teamModel";
import User from "@/Models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig"

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        console.log(body)
        const { name, description, owner, teamId } = body;

        if (!name || !teamId) {
            return NextResponse.json({ error: "Name and Team ID are required" }, { status: 400 });
        }

        await connect();

        const newProject = new Project({
            name,
            description: description || "",
            teamId,
            owner
        });
        const savedProject = await newProject.save();
        if (teamId) {
            const updatedTeam = await Team.findByIdAndUpdate(teamId, {
                $push: { projects: savedProject._id }
            },{new:true});
            if (updatedTeam.Members?.length) {
                for (const member of updatedTeam.Members) {
                    console.log(savedProject._id);
                    const updatedUser = await User.findByIdAndUpdate(member.memberId, {
                        $push: { projects: savedProject._id },
                    },{new:true});
                    console.log("updateduser",updatedUser)
                }
            }
        }
        if (owner) {
            await User.findByIdAndUpdate(owner, {
                $push: { projects: savedProject._id }
            },{new:true});
        }
        console.log(owner);
        return NextResponse.json({ savedProject, success: true }, { status: 201 });
    }
    catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
import Project from "@/Models/projectModel";
import Team from "@/Models/teamModel";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig"

export async function POST(request : NextRequest) {
    try {
        const body = await request.json();
        const { name, description, teamId, owner} = body;

        if (!name || !teamId) {
            return NextResponse.json({ error: "Name and Team ID are required" }, { status: 400 });
        }

        await connect();

        const newProject = new Project({
            name,
            description: description || "",
            teamId,
            owner,
        });

        const savedProject = await newProject.save();

        const updatedTeam = await Team.findByIdAndUpdate(
            teamId,
            { $push: { projects: savedProject._id } },
            {new: true}
        );
        return NextResponse.json(savedProject, { status: 201 });
    }
    catch(error) {
        console.error(error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            {status: 500}
        );
    }
}
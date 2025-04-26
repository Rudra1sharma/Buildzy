import { connect } from "@/dbConfig/dbConfig";
import Project from "@/Models/projectModel";
import User from "@/Models/userModel";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
    try {
        await connect();
        const body = await req.json();
        const
            { create_at,
                description,
                full_name,
                github_id,
                name,
                owner,
                owner_id
            } = body;
        const newProject = await Project.create({
            name,
            description,
            create_at,
            full_name,
            github_id,
            owner,
            owner_id,
        });
        await User.findByIdAndUpdate(owner_id, {
            $push:{
                projects: newProject._id
            }
        })
        return NextResponse.json({ message: "Project saved successfully", project: newProject }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Server Error", error }, { status: 500 });
    }
}
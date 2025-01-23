// get all project by team ID
import Project from "@/Models/projectModel";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import { json } from "stream/consumers";
import Team from "@/Models/teamModel";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const team = url.searchParams.get("teamId");

    if (!team) {
      return NextResponse.json(
        { error: "Team ID is required" },
        { status: 400 }
      );
    }
    await connect();

    // all projects by team ID
    const teamineed = await Team.findById(team)
    const projects = await teamineed.projects

    if (!projects || projects.length === 0) {
      return NextResponse.json(
        { error: "No Projects found for this team" },
        { status: 404 }
      );
    }

    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

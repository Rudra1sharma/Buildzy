// get all project by team ID
import Project from "@/Models/projectModel";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import { json } from "stream/consumers";

export async function GET(request: NextRequest) {
  console.log("helllo")
  try {
    const url = new URL(request.url);
    const teamId = url.searchParams.get("teamId");

    if (!teamId) {
      console.log("id daal")
      return NextResponse.json(
        { error: "Team ID is required" },
        { status: 400 }
      );
    }
    await connect();

    // all projects by team ID
    const projects = await Project.find({ teamId });

    if (!projects || projects.length === 0) {
      console.log("hatt")
      return NextResponse.json(
        { error: "No Projects found for this team" },
        { status: 404 }
      );
    }
    console.log(projects)
    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

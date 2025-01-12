import Project from "@/Models/projectModel";
import Team from "@/Models/teamModel";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";

export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Project Id is required" },
        { status: 400 }
      );
    }
    await connect();

    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      return NextResponse.json({ error: "Project Not Found" }, { status: 404 });
    }
    
    await Team.updateMany(
      { projects: id }, 
      { $pull: { projects: id } } 
    );
      
    return NextResponse.json(
      {
        message: "Project deleted successfully",
        project: deletedProject,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

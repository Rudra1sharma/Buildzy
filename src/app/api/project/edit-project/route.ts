import Project from "@/Models/projectModel";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import { LucideArrowDownRightFromSquare, X } from "lucide-react";
import { error } from "console";

export async function PUT(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Project Id is Required" },
        { status: 400 }
      );
    }
    const body = await request.json();

    if (!body) {
      return NextResponse.json(
        { error: "Request body is required" },
        { status: 400 }
      );
    }

    await connect();

    const updatedProject = await Project.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedProject) {
      return NextResponse.json({ error: "Project Not Found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        message: "Project updated successfully",
        project: updatedProject,
      },
      { status: 200 }    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

import { connect } from "@/dbConfig/dbConfig";
import Editor from "@/Models/editorModel";
import { NextRequest, NextResponse } from "next/server";

// GET editor data
export async function GET(request: NextRequest) {
  try {
    await connect();
    const editorId = request.nextUrl.pathname.split('/').pop();
    
    if (!editorId) {
      return NextResponse.json({ error: "Editor ID is required" }, { status: 400 });
    }

    const editor = await Editor.findOne({ editorId });
    
    if (!editor) {
      return NextResponse.json({ error: "Editor not found" }, { status: 404 });
    }

    return NextResponse.json({ editor });
  } catch (error) {
    console.error("Error fetching editor data:", error);
    return NextResponse.json({ error: "Error fetching editor data" }, { status: 500 });
  }
}

// POST/Save editor data
export async function POST(request: NextRequest) {
  try {
    await connect();
    const editorId = request.nextUrl.pathname.split('/').pop();
    const { projectData, userId } = await request.json();

    if (!editorId || !projectData || !userId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    let editor = await Editor.findOne({ editorId });

    if (!editor) {
      // Create new editor if it doesn't exist
      editor = await Editor.create({
        editorId,
        projectData,
        owner: userId,
        collaborators: [userId]
      });
      console.log("Created new editor:", editorId);
    } else {
      // Update existing editor
      editor.projectData = projectData;
      editor.lastModified = new Date();
      await editor.save();
      console.log("Updated existing editor:", editorId);
    }

    return NextResponse.json({ editor });
  } catch (error) {
    console.error("Error saving editor data:", error);
    return NextResponse.json({ error: "Error saving editor data" }, { status: 500 });
  }
}

// Add collaborator to editor
export async function PUT(request: NextRequest) {
  try {
    await connect();
    const editorId = request.nextUrl.pathname.split('/').pop();
    const { userId } = await request.json();

    const editor = await Editor.findOne({ editorId });
    if (!editor) {
      return NextResponse.json({ error: "Editor not found" }, { status: 404 });
    }

    if (!editor.collaborators.includes(userId)) {
      editor.collaborators.push(userId);
      await editor.save();
    }

    return NextResponse.json({ editor });
  } catch (error) {
    return NextResponse.json({ error: "Error adding collaborator" }, { status: 500 });
  }
}

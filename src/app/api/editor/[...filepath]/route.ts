import { connect } from "@/dbConfig/dbConfig";
import Editor from "@/Models/editorModel";
import { NextRequest, NextResponse } from "next/server";

// Helper to get filepath from params
function getFilepath(request: NextRequest) {
  const parts = request.nextUrl.pathname.split('/').slice(3);
  return parts.join('/');
}

// GET editor data
export async function GET(request: NextRequest) {
  try {
    await connect();
    const filepath = getFilepath(request);
    
    if (!filepath) {
      return NextResponse.json({ error: "Filepath is required" }, { status: 400 });
    }

    const editor = await Editor.findOne({ filepath });

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
    const filepath = getFilepath(request);
    // console.log('Filepath:', filepath);
    // console.log('Request:', request);
    const { projectData, userId } = await request.json();

    if (!filepath || !projectData || !userId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    let editor = await Editor.findOne({ filepath });

    if (!editor) {
      // Create new editor if it doesn't exist
      editor = await Editor.create({
        filepath,
        projectData,
        owner: userId,
        collaborators: [userId]
      });
      console.log("Created new editor:", filepath);
    } else {
      // Update existing editor
      editor.projectData = projectData;
      editor.lastModified = new Date();
      await editor.save();
      console.log("Updated existing editor:", filepath);
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
    const filepath = getFilepath(request);
    const { userId } = await request.json();

    const editor = await Editor.findOne({ filepath });
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
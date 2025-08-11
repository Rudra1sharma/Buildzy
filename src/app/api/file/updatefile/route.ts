import { connect } from "@/dbConfig/dbConfig";
import File from "@/Models/FileModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connect();
    const { filepath, content, name, Project, owner_id } = await req.json();

    if (!filepath || !name || !Project ) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    let file = await File.findOne({ filepath });
    if (!file) {
      file = await File.create({ filepath, content, name, Project, owner_id });
    } else {
      file.content = content;
      await file.save();
    }

    return NextResponse.json({ message: "File saved successfully", file }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server Error", error }, { status: 500 });
  }
}
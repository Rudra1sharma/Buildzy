import { connect } from "@/dbConfig/dbConfig";
import File from "@/Models/FileModel"; 
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connect();
        const body = await req.json();
        const { fileId } = body;

        if (!fileId) {
            return NextResponse.json({ message: "File ID is required" }, { status: 400 });
        }

        const file = await File.findById(fileId);

        if (!file) {
            return NextResponse.json({ message: "File not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "File fetched successfully", file }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Server Error", error }, { status: 500 });
    }
}
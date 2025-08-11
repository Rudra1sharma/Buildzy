import { NextRequest, NextResponse } from 'next/server';
import { connect } from "@/dbConfig/dbConfig";
import File from '@/Models/FileModel';
import User from '@/Models/userModel';

export async function POST(request: NextRequest) {
  try {
    await connect();
    const body = await request.json();
    const { name, Project, owner_id } = body;

    if (!name || !Project) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const newFile = await File.create({ name, Project, owner_id });

    return NextResponse.json({ message: "File created successfully", file: newFile }, { status: 201 });
  } catch (error) {
    console.error('Error creating file:', error);
    return NextResponse.json({ message: "Server Error", error }, { status: 500 });
  }
}
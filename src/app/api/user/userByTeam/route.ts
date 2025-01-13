import User from "@/Models/userModel";
import { error } from "console";
import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";


export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const teamId = url.searchParams.get("teamId");

    if (!teamId) {
      return NextResponse.json(
        { error: "Team ID is required" },
        { status: 400 }
      );
    }
    await connect();

    const users = await User.findById(teamId);

    if (users.length() === 0) {
      return NextResponse.json(
        { error: "No User found for this Team" },
        { status: 404 }
      );
    }
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

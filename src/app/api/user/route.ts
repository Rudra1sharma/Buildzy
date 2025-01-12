// get user from id
// get all user of a team

import User from "@/Models/userModel";

import { connect } from "";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = params;

  try {
    await connect();

    const user = await db.collection("users").findOne({ _id: id });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

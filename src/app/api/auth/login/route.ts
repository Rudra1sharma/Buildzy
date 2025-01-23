import { connect } from "@/dbConfig/dbConfig";
import User from "@/Models/userModel";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    connect();
    try {
        const { email, password } = await req.json();

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) {
            return NextResponse.json({ error: "Invalid password" }, { status: 401 });
        }

        return NextResponse.json({ message: "Login successful" }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}
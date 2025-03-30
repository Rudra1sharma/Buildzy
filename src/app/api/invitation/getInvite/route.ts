import { connect } from "@/dbConfig/dbConfig";
import Invitation from "@/Models/invitationModel";
import User from "@/Models/userModel";
import Team from "@/Models/teamModel";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(req: NextRequest) {
    if (req.method !== "GET") {
        return NextResponse.json({ error: "Invalid HTTPS method", status: 405 });
    }
    
    try {
        await connect(); // Ensure database connection

        const url = new URL(req.url);
        const userId = url.searchParams.get("id");

        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const invitationIds = user.invitations;
        if (!invitationIds || invitationIds.length === 0) {
            return NextResponse.json({ invitations: [], status: 200 });
        }
        const invitations = await Invitation.find({ _id: { $in: invitationIds } })
            .populate("inviter", "name") 
            .populate("receiver", "name")
            .populate("team", "teamName");

        const invites = invitations.map((invite, index) => ({
            id: index + 1,
            _id: invite._id,
            inviter: invite.inviter?.name || "Unknown",
            receiver: invite.receiver?.name || "Unknown",
            team: invite.team?.teamName || "Unknown", // Assuming teams also have a name field
            status: invite.status,
            createdAt: invite.createdAt,
            updatedAt: invite.updatedAt
        }));
        return NextResponse.json({ invitations: invites, status: 200 });

    } catch (error) {
        console.error("Error fetching invitations:", error);
        return NextResponse.json(
            { error: "Internal Server Error while fetching invites" },
            { status: 500 }
        );
    }
}

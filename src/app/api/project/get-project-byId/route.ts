// get project by ID
import Project from "@/Models/projectModel";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Project ID is required" },
        { status: 400 }
      );
    }
    await connect();

    const project = await Project.findById(id);

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    return NextResponse.json(project, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// import Project from "@/Models/projectModel";
// import User from "@/Models/userModel";
// import Team from "@/Models/teamModel";
// import { NextRequest, NextResponse } from "next/server";
// import { connect } from "@/dbConfig/dbConfig";

// export async function POST(request: NextRequest) {
//   try {
//     const { userId } = await request.json();

//     if (!userId) {
//       return NextResponse.json(
//         { error: "User ID is required" },
//         { status: 400 }
//       );
//     }

//     await connect();

//     // Find the user
//     const user = await User.findById(userId).populate("projects");

//     if (!user) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }

//     let userProjects = user.projects || [];

//     if (user.teams && user.teams.length > 0) {
//       const teams = await Team.find({
//         _id: { $in: user.teams },
//       }).populate("projects");

//       const teamProjects = teams.flatMap((team) => team.projects || []);
//       const teamProjectIds = new Set(teamProjects.map((p) => p._id.toString()));

//       const uniqueTeamProjects = teamProjects.filter(
//         (project) =>
//           !userProjects.some((p) => p._id.toString() === project._id.toString())
//       );

//       userProjects = [...userProjects, ...uniqueTeamProjects];
//     }

//     return NextResponse.json({
//       success: true,
//       projects: userProjects,
//     });
//   } catch (error) {
//     console.error("Error fetching projects:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }
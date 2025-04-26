// iska koi kaam nhi kyuki create repo ka kaam create project wala route krega .
// so no need of this but pde rehne do baad m dekhenge iska kta krna h !!

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { accessToken, repoName, description } = await request.json();

    if (!accessToken || !repoName) {
      return NextResponse.json(
        { error: "Access token and repository name are required" },
        { status: 400 }
      );
    }

    // GitHub API request to create a new repository
    const response = await fetch("https://api.github.com/user/repos", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      body: JSON.stringify({
        name: repoName,
        description: description || "",
        private: false,
        auto_init: true,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to create GitHub repository", details: data },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error creating GitHub repository:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

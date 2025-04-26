import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { accessToken, repoName, description } = await req.json();

  const response = await fetch("https://api.github.com/user/repos", {
    method: "POST",
    headers: {
      Authorization: `token ${accessToken}`,
      Accept: "application/vnd.github+json",
    },
    body: JSON.stringify({
      name: repoName,
      description,
      private: false,
    }),
  });

  const data = await response.json();
  return NextResponse.json(data);
}

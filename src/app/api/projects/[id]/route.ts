// ye jab project ko click krenge so jo new page khulega jis pr detail hongi, project ke baare
// like project files, members name, editor section honga, uska route h y

import { NextResponse } from "next/server";

// Dummy data representing your projects
const projects = [
  {
    id: "1",
    name: "Portfolio Website",
    description: "A sleek personal website built with React and Tailwind.",
    repo: "https://github.com/user/portfolio",
    techStack: ["React", "TailwindCSS"],
    members: 1,
  },
  {
    id: "2",
    name: "Chat App",
    description: "Real-time chat app using Socket.IO and MongoDB.",
    repo: "https://github.com/user/chat-app",
    techStack: ["React", "Node.js", "Socket.IO"],
    members: 4,
  },
  // ...more projects
];

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  return NextResponse.json(project);
}

import { connect } from '@/dbConfig/dbConfig';
import Project from '@/Models/projectModel';
import User from '@/Models/userModel';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, res: NextResponse) {
    if (req.method != 'GET') {
        return NextResponse.json({ message: 'Method Not ALlower' });
    }
    const urlParts = req.url.split('?')
    const queryString = urlParts[1] || ''
    const params = new URLSearchParams(queryString)
    const userId = params.get('userId')
    const gitid = params.get('gitid')
    if (!userId) {
        return NextResponse.json({ message: 'Invalid or missing userId' });
    }
    try {
        await connect();
        const user = await User.findById(userId).populate('projects');
        if (!user) {
            return NextResponse.json({ message: 'User not found' });
        }
        const projects = await Promise.all(
            user.projects.map(async (project: any) => {
                const proj = await Project.findById(project);
                return {
                    id: proj._id.toString(),
                    name: proj.name,
                };
            })
        );
        const metadata = await Promise.all(
            projects.map(async (project: any) => {
                const res = await fetch(`https://api.github.com/repos/${gitid}/${project.name}`, {
                    headers: {
                        Authorization: `Bearer ${user?.accessToken}`,
                        Accept: "application/vnd.github+json"
                    }
                });
                const res2 = await fetch(`https://api.github.com/repos/${gitid}/${project.name}/collaborators`, {
                    headers: {
                        Authorization: `Bearer ${user?.accessToken}`,
                        Accept: "application/vnd.github+json"
                    }
                });
                const data = await res.json()
                const data2 = await res2.json()
                return {
                    id: data.id,
                    name: data.name,
                    description: data.description,
                    repo: data.html_url,
                    members: data2.length
                }
            })
        )
        return NextResponse.json(metadata);

    } catch (error) {
        console.log(error)
    }
}

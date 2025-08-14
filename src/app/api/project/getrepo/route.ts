import { connect } from '@/dbConfig/dbConfig';
import Project from '@/Models/projectModel';
import User from '@/Models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import pLimit from 'p-limit';

export async function GET(req: NextRequest) {
    if (req.method !== 'GET') {
        return NextResponse.json({ message: 'Method Not Allowed' });
    }

    const urlParts = req.url.split('?');
    const queryString = urlParts[1] || '';
    const params = new URLSearchParams(queryString);
    const userId = params.get('userId');

    if (!userId) {
        return NextResponse.json({ message: 'Invalid or missing userId' });
    }

    try {
        await connect();
        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({ message: 'User not found' });
        }

        // Batch DB query instead of N separate queries
        const projects = await Project.find({ _id: { $in: user.projects } });
        const projectsToRemove: mongoose.Types.ObjectId[] = [];

        const limit = pLimit(5); //Limit concurrency to 5 GitHub calls at a time

        const metadata = await Promise.all(
            projects.map((project) =>
                limit(async () => {
                    const repoUrl = `https://api.github.com/repos/${project.owner}/${project.name}`;

                    const res = await fetch(repoUrl, {
                        headers: {
                            Authorization: `Bearer ${user?.accessToken}`,
                            Accept: 'application/vnd.github+json'
                        }
                    });

                    if (res.status === 404) {
                        projectsToRemove.push(project._id);
                        return null;
                    }

                    const data = await res.json();

                    const res2 = await fetch(`${repoUrl}/collaborators`, {
                        headers: {
                            Authorization: `Bearer ${user?.accessToken}`,
                            Accept: 'application/vnd.github+json'
                        }
                    });
                    const data2 = await res2.json();

                    return {
                        mongoId: project._id.toString(),
                        id: data.id,
                        name: data.name,
                        description: data.description,
                        repo: data.html_url,
                        owner: data.owner.login,
                        members: Array.isArray(data2) ? data2.length : 0
                    };
                })
            )
        );
        const filteredMetadata = metadata.filter((item) => item !== null);
        if (projectsToRemove.length > 0) {
            await Project.deleteMany({ _id: { $in: projectsToRemove } });
            user.projects = user.projects.filter(
                (p: mongoose.Types.ObjectId) =>
                    !projectsToRemove.some((id) => id.equals(p))
            );
            await user.save();
        }
        return NextResponse.json(filteredMetadata);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}

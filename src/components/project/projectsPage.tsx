'use client';
import DashboardHeader from '@/components/dashboard/dashboardHeader';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiUsers, FiStar } from 'react-icons/fi';
import {
    SiReact, SiTailwindcss, SiSocketdotio, SiMongodb, SiCss3, SiJavascript, SiHtml5
} from 'react-icons/si';
import { useState, useEffect } from 'react';
import { Spinner } from '../ui/spinner';
import { useSession } from 'next-auth/react';
import axios from 'axios';

const techIcons = {
    'CSS': <SiCss3 />, 'Javascript': <SiJavascript />, 'HTML5': <SiHtml5 />
};

interface ProjectProps {
    mongoId: string;
    id: string;
    name: string;
    owner:string;
    description: string;
    repo: string;
    members: number;
    techStack: string[];
}

export default function ProjectsPage() {
    const { data: session, status } = useSession()
    const router = useRouter();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [temp, setTemp] = useState('');
    const [project, setProject] = useState<ProjectProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [formErrors, setFormErrors] = useState<{ repoName?: boolean }>({});
    const [isCreatingRepo, setIsCreatingRepo] = useState(false);

    const openRepo = (repoUrl: string) => {
        window.open(repoUrl, '_blank');
    };
    useEffect(() => {
        fetchRepos();
    }, [])
    const fetchRepos = async () => {
        const userid = session?.user?.id
        const gitid = session?.user?.username
        setLoading(true)
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/project/getrepo?userId=${userid}&gitid=${gitid}`)
            const data = await res.json();
            const proj = data.map((project: any) => ({
                ...project,
                techStack: ['HTML5', 'CSS', 'Javascript']
            }))
            setProject(proj)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }
    const validateForm = (field: string, value: string) => {
        let isValid = true;

        switch (field) {
            case 'repoName':
                isValid = value.trim() !== '';
                setFormErrors(prev => ({ ...prev, repoName: !isValid }));
                break;
            case 'commitMessage':
                isValid = value.trim() !== '';
                setFormErrors(prev => ({ ...prev, commitMessage: !isValid }));
                break;
            case 'pageName':
                isValid = value.trim() !== '';
                setFormErrors(prev => ({ ...prev, pageName: !isValid }));
                break;
            case 'fileName':
                isValid = value.trim() !== '';
                setFormErrors(prev => ({ ...prev, fileName: !isValid }));
                break;
            case 'inviteEmail':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                isValid = emailRegex.test(value);
                setFormErrors(prev => ({ ...prev, inviteEmail: !isValid }));
                break;
        }

        return isValid;
    };
    const createRepo = async (accessToken: any) => {
        if (!validateForm('repoName', temp)) return;

        setIsCreatingRepo(true);
        try {
            const res = await fetch("https://api.github.com/user/repos", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    Accept: "application/vnd.github+json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: temp,
                    description: "Created with 💝 by Buildzy using GitHub OAuth!",
                    private: false,
                }),
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || "Failed to create repository");
            }

            const payload = {
                create_at: data.created_at || new Date().toISOString(),
                description: data.description,
                full_name: data.full_name,
                github_id: data.id,
                name: data.name,
                owner: session?.user?.username || "unknown",
                owner_id: session?.user?.id || "unknown",
            };

            await axios.post('${process.env.NEXT_PUBLIC_API_BASE}/api/project/createrepo', payload);
            setIsDialogOpen(false)
        } catch (error: any) {
            console.error("Error creating repo or saving project:", error.message);
        } finally {
            setIsCreatingRepo(false);
        }
    };

    return (
        <div className='w-full'>
            <DashboardHeader />
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
                className="min-h-screen p-6 bg-gradient-to-b from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-950"
            >

                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Your Projects</h1>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-semibold text-base rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-transparent hover:border-white"
                                onClick={() => setIsDialogOpen(true)}
                            >
                                <FiPlus className="text-lg" />
                                Create New Project
                            </motion.button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle>Create Repository</DialogTitle>
                                <DialogDescription>
                                    What should be your new repository name?
                                </DialogDescription>
                            </DialogHeader>
                            <div>
                                <label className="text-sm font-medium">Your repository name</label>
                                <Input
                                    value={temp}
                                    onChange={(e) => {
                                        setTemp(e.target.value);
                                        validateForm('repoName', e.target.value);
                                    }}
                                    placeholder="Your Repo"
                                    className={`mt-1 ${formErrors.repoName ? "border-red-500" : ""}`}
                                />
                                {formErrors.repoName && (
                                    <p className="text-xs text-red-500 mt-1">Repository name cannot be empty</p>
                                )}
                            </div>
                            <DialogFooter>
                                <Button variant="secondary" onClick={() => setIsDialogOpen(false)} disabled={isCreatingRepo}>Cancel</Button>
                                <Button
                                    onClick={() => createRepo(session?.user?.access_token)}
                                    disabled={isCreatingRepo || !!formErrors.repoName}
                                >
                                    {isCreatingRepo ? (
                                        <>
                                            <Spinner size="small" className="mr-2" />
                                        </>
                                    ) : (
                                        "Create"
                                    )}
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center w-full py-20">
                        <Spinner size="small" className="mr-2" />
                    </div>
                ) : (<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <AnimatePresence>
                        {project.length === 0 ? (
                            <div className="flex justify-center items-center w-full py-20 text-center">
                                <span className="text-gray-500 dark:text-gray-300 text-lg">
                                    No projects found yet. Create a new one to get started!
                                </span>
                            </div>
                        ) : (project.map((project) => (
                            <motion.div
                                key={project.id}
                                className="cursor-pointer"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.97 }}
                                transition={{ type: 'spring', stiffness: 250 }}
                                onClick={() => router.push(`/projects/${project.id}?name=${project.name}&refrence=${project.mongoId}&owner=${project.owner}`)}
                            >
                                <Card className="relative p-6 bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 shadow-xl rounded-2xl hover:shadow-2xl transition-shadow min-h-[240px] flex flex-col justify-between">
                                    <div className="absolute top-4 right-4 flex items-center gap-2">
                                        <div className="flex items-center gap-1 text-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 px-3 py-1 rounded-full shadow-md">
                                            <FiUsers className="text-gray-600" />
                                            <span>{project.members} {project.members === 1 ? 'member' : 'members'}</span>
                                        </div>
                                    </div>

                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{project.name}</h2>
                                        <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                                        <div className="flex flex-wrap gap-3 mb-4">
                                            {project.techStack.map((tech) => (
                                                <div
                                                    key={tech}
                                                    className="flex items-center gap-1 px-3 py-1 bg-white dark:bg-gray-700 text-xs rounded-full border border-gray-300 dark:border-gray-600 shadow-sm text-gray-800 dark:text-gray-200"
                                                >
                                                    {techIcons[tech as keyof typeof techIcons]} <span>{tech}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex justify-between mt-4">
                                        <Button
                                            variant="outline"
                                            className="text-sm dark:border-gray-500 dark:text-white dark:hover:bg-gray-700"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                router.push(`/projects/${project.id}?name=${project.name}&refrence=${project.mongoId}&owner=${project.owner}`);
                                            }}
                                        >
                                            View Details
                                        </Button>
                                        <Button
                                            className="bg-black text-white text-sm hover:bg-gray-800"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                openRepo(project.repo);
                                            }}
                                        >
                                            Open Repo
                                        </Button>
                                    </div>
                                </Card>
                            </motion.div>
                        )))}
                    </AnimatePresence>
                </div>)}
            </motion.div>
        </div>
    );
}

'use client';

import DashboardHeader from '@/components/dashboard/dashboardHeader';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiUsers, FiStar } from 'react-icons/fi';
import {
    SiReact, SiTailwindcss, SiSocketdotio, SiMongodb,
    SiNodedotjs, SiNextdotjs, SiStripe, SiPrisma, SiPostgresql
} from 'react-icons/si';
import { useState } from 'react';

// import { useSession } from "next-auth/react";
// const { data: session } = useSession();

const techIcons = {
    'React': <SiReact />, 'TailwindCSS': <SiTailwindcss />, 'Socket.IO': <SiSocketdotio />,
    'MongoDB': <SiMongodb />, 'Node.js': <SiNodedotjs />, 'Next.js': <SiNextdotjs />,
    'Stripe': <SiStripe />, 'Prisma': <SiPrisma />, 'PostgreSQL': <SiPostgresql />
};

const dummyProjects = [
    {
        id: '1', name: 'Portfolio Website', description: 'A sleek personal website built with React and Tailwind.',
        repo: 'https://github.com/user/portfolio', techStack: ['React', 'TailwindCSS'], members: 1
    },
    {
        id: '2', name: 'Chat App', description: 'Real-time chat app using Socket.IO and MongoDB.',
        repo: 'https://github.com/user/chat-app', techStack: ['React', 'Node.js', 'Socket.IO'], members: 4
    },
    {
        id: '3', name: 'E-commerce Site', description: 'Full-stack shopping platform with cart and checkout.',
        repo: 'https://github.com/user/ecommerce', techStack: ['Next.js', 'MongoDB', 'Stripe'], members: 3
    },

    {
        id: '4', name: 'Blog Platform', description: 'A Markdown-based blog site with user authentication.',
        repo: 'https://github.com/user/blog-platform', techStack: ['Next.js', 'Prisma', 'PostgreSQL'], members: 2
    }
];

export default function ProjectsPage() {
    const router = useRouter();
    const [favorites, setFavorites] = useState<string[]>([]);

    const toggleFavorite = (id: string) => {
        setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
    };

    // const handleCreateRepo = async () => {
    //     if (!session?.accessToken) {
    //         alert("You must be signed in with GitHub to create a repo.");
    //         return;
    //     }

    //     const repoName = prompt("Enter the name of your new repository:");
    //     const description = prompt("Enter a description:");

    //     const res = await fetch("/api/github/create-repo", {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({
    //             accessToken: session.accessToken,
    //             repoName,
    //             description,
    //         }),
    //     });

    //     const data = await res.json();
    //     if (data?.html_url) {
    //         alert(`Repo created: ${data.html_url}`);
    //         window.open(data.html_url, "_blank");
    //     } else {
    //         alert("Failed to create repo.");
    //         console.error(data);
    //     }
    // };

    const openRepo = (repoUrl: string) => {
        window.open(repoUrl, '_blank');
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen p-6 bg-gradient-to-b from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-950"
        >
            <DashboardHeader />

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Your Projects</h1>
                <motion.button

                    // onClick={handleCreateRepo}

                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-semibold text-base rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-transparent hover:border-white"
                >
                    <FiPlus className="text-lg" />
                    Create New Project
                </motion.button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <AnimatePresence>
                    {dummyProjects.map((project) => (
                        <motion.div
                            key={project.id}
                            className="cursor-pointer"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.97 }}
                            transition={{ type: 'spring', stiffness: 250 }}
                            onClick={() => router.push(`/projects/${project.id}`)}
                        >
                            <Card className="relative p-6 bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 shadow-xl rounded-2xl hover:shadow-2xl transition-shadow min-h-[240px] flex flex-col justify-between">
                                {/* Members and Favorite */}
                                <div className="absolute top-4 right-4 flex items-center gap-2">
                                    <div className="flex items-center gap-1 text-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 px-3 py-1 rounded-full shadow-md">
                                        <FiUsers className="text-gray-600" />
                                        <span>{project.members} {project.members === 1 ? 'member' : 'members'}</span>
                                    </div>
                                    <button
                                        className={`text-xl ${favorites.includes(project.id) ? 'text-yellow-400' : 'text-gray-400 hover:text-yellow-400'}`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleFavorite(project.id);
                                        }}
                                    >
                                        <FiStar />
                                    </button>
                                </div>

                                {/* Content */}
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

                                {/* Buttons */}
                                <div className="flex justify-between mt-4">
                                    <Button
                                        variant="outline"
                                        className="text-sm dark:border-gray-500 dark:text-white dark:hover:bg-gray-700"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            router.push(`/projects/${project.id}`);
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
                    ))}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}

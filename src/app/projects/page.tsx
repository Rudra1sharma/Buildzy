'use client'
import ProjectsPage from "@/components/project/projectsPage";
import { Spinner } from "@/components/ui/spinner";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function page() {
    const { data: session, status } = useSession();
    const router = useRouter()
    useEffect(() => {
        if (status === "loading") return;
        if (!session) {
            router.push("/login");
        }
    }, [session, status, router]);
    if (status === 'loading') {
        return (
            <div className="flex justify-center items-center h-screen w-full">
                <Spinner size="large" />
            </div>
        )
    }
    return (
        <ProjectsPage />
    )
}
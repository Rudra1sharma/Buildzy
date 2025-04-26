'use client'
import ProjectsPage from "@/components/project/projectsPage";
import { Spinner } from "@/components/ui/spinner";
import { useSession } from "next-auth/react";

export default function page(){
    const {data : session, status} = useSession();
    if(status === 'loading'){
        return(
            <Spinner size="large" />
        )
    }
    return (
        <ProjectsPage/>
    )
}
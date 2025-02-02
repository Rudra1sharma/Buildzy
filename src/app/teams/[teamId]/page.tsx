'use client'
import TeamDetails from '@/components/team/teamDetails'
import TeamMembers from '@/components/team/teamMembers'
import TeamProjects from '@/components/team/teamProjects'
import Pagination from '@/components/pagination'
import DashboardHeader from '@/components/dashboard/dashboardHeader'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'


export default function TeamPage({ params, searchParams }: { params: { teamId: string }, searchParams: { page?: string } }) {
    const currentPage = Number(searchParams.page) || 1
    const { isAuthenticated } = useAuth();
    const router = useRouter()
    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/login");
        }
    }, [isAuthenticated, router]);

    return (

        <div className="flex flex-col min-h-screen">
            <DashboardHeader />
            <div className="container mx-auto py-3 grid gap-4 md:grid-cols-3 h-[90vh]">
                {/* First Column: Team Details + Team Members (1/3 of width) */}
                <div className="flex flex-col gap-4">
                    {/* Row 1: Team Details */}
                    <div className="h-[40%]">
                        <TeamDetails teamId={params.teamId} />
                    </div>
                    {/* Row 2: Team Members */}
                    <div className="h-[60%]">
                        <TeamMembers teamId={params.teamId} />
                    </div>
                </div>

                {/* Second Column: Team Projects (2/3 of width) */}
                <div className="md:col-span-2">
                    <TeamProjects teamId={params.teamId} currentPage={currentPage} />
                    <Pagination currentPage={currentPage} totalPages={3} baseUrl={`/teams/${params.teamId}`} />
                </div>
            </div>


        </div>
    )
}


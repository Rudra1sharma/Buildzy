import { Metadata } from 'next'
import TeamDetails from '@/components/team/teamDetails'
import TeamMembers from '@/components/team/teamMembers'
import TeamProjects from '@/components/team/teamProjects'
import Pagination from '@/components/pagination'
import DashboardHeader from '@/components/dashboard/dashboardHeader'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/dist/client/components/navigation'

export const metadata: Metadata = {
    title: 'Team Details | Real-Time Paint App',
    description: 'View and manage team details, members, and projects.',
}

export default function TeamPage({ params, searchParams }: { params: { teamId: string }, searchParams: { page?: string } }) {
    const currentPage = Number(searchParams.page) || 1
    const { isAuthenticated } = useAuth();
    const router = useRouter()
    console.log(isAuthenticated())
    if (!isAuthenticated()) {
        router.push('/login')
        return null;
    }

    return (

        <div className="flex flex-col min-h-screen">
            <DashboardHeader />
            <div className="container mx-auto py-8">
                <TeamDetails teamId={params.teamId} />
                <div className="mt-8 grid gap-8 md:grid-cols-2">
                    <TeamMembers teamId={params.teamId} />
                    <div className="space-y-6">
                        <TeamProjects teamId={params.teamId} currentPage={currentPage} />
                        <Pagination currentPage={currentPage} totalPages={3} baseUrl={`/teams/${params.teamId}`} />
                    </div>
                </div>
            </div>
        </div>
    )
}


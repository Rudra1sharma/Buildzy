import { Metadata } from 'next'
import TeamDetails from '@/components/team-details'
import TeamMembers from '@/components/team-members'
import TeamProjects from '@/components/team-projects'
import Pagination from '@/components/pagination'

export const metadata: Metadata = {
  title: 'Team Details | Real-Time Paint App',
  description: 'View and manage team details, members, and projects.',
}

export default function TeamPage({ params, searchParams }: { params: { teamId: string }, searchParams: { page?: string } }) {
  const currentPage = Number(searchParams.page) || 1

  return (
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
  )
}


import { Metadata } from 'next'
import TeamOverview from '@/components/teams/teamOverview'
import TeamCreation from '@/components/teams/teamCreation'
import TeamInvitations from '@/components/teams/teamInvitations'
import TeamCollaboration from '@/components/teams/teamCollaboration'
import DashboardHeader from '@/components/dashboard/dashboardHeader'

export const metadata: Metadata = {
  title: 'Teams | Real-Time Paint App',
  description: 'Manage your teams and collaborate with others in our real-time paint application.',
}

export default function TeamsPage() {
  return (
    <div className="flex flex-col min-h-screen">
        <DashboardHeader/>
      <div className="grid gap-8 m-5 md:grid-cols-2">
        <TeamOverview />
        <div className="space-y-8">
          <TeamCreation />
          <TeamInvitations />
        </div>
        <TeamCollaboration />
      </div>
    </div>
  )
}


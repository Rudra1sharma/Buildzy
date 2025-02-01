"use client"

import { Metadata } from 'next'
import TeamOverview from '@/components/teams/teamOverview'
import TeamCreation from '@/components/teams/teamCreation'
import TeamInvitations from '@/components/teams/teamInvitations'
import TeamCollaboration from '@/components/teams/teamCollaboration'
import DashboardHeader from '@/components/dashboard/dashboardHeader'
import React from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

export default function TeamsPage() {
  const [flag, setflag] = React.useState(false);
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
      <div className="grid gap-8 m-5 md:grid-cols-2">
        <TeamOverview flag={flag} setflag={setflag} />
        <div className="space-y-8">
          <TeamCreation flag={flag} setflag={setflag} />
          <TeamInvitations />
        </div>
        <TeamCollaboration />
      </div>
    </div>
  )
}
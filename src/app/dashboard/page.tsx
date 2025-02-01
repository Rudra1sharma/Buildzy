"use client"
import DashboardHeader from '@/components/dashboard/dashboardHeader'
import ProjectsOverview from '@/components/dashboard/projectsOverview'
import ActivityFeed from '@/components/dashboard/activityFeed'
import HelloUser from '@/components/dashboard/helloUser'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'


export default function DashboardPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter()
  console.log(isAuthenticated())
  if(!isAuthenticated()){
    router.push('/login')
    return null;
  }
  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader />
      <main className="flex-grow p-6 md:p-8 lg:p-12">
        <div className="grid gap-6 md:grid-cols-3">
        <div className='flex flex-col gap-4'>
            <HelloUser />
            <ActivityFeed />
          </div>
          <div className="md:col-span-2">
            <ProjectsOverview />
          </div>
        </div>
      </main>
    </div>
  )
}
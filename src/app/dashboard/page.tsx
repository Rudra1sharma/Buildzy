"use client"
import DashboardHeader from '@/components/dashboard/dashboardHeader'
import ProjectsOverview from '@/components/dashboard/projectsOverview'
import ActivityFeed from '@/components/dashboard/activityFeed'
import HelloUser from '@/components/dashboard/helloUser'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Spinner } from '@/components/ui/spinner'
import { useEffect } from 'react'


export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
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
    <>
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
    </>
  )
}
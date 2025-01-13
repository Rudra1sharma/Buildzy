import { Metadata } from 'next'
import NotificationsList from '@/components/notificationsList'
import DashboardHeader from '@/components/dashboard/dashboardHeader'

export const metadata: Metadata = {
    title: 'Notifications | Real-Time Paint App',
    description: 'View your latest notifications and updates.',
}

export default function NotificationsPage() {
    return (
        <div className="flex flex-col max-h-screen">
            <DashboardHeader />
            <div className="container mx-auto py-8">
                <h1 className="text-3xl font-bold mb-6">Notifications</h1>
                <NotificationsList />
            </div>
        </div>
    )
}


import { Suspense } from 'react'
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AuthProfileButton } from '../components/auth-profile-button'
import { TeamManagement } from '../components/team-management'
import { AuthProfileButtonSkeleton } from '../components/auth-profile-button-skeleton'
import { TeamsSidebar } from '../components/teams-sidebar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {

    // If no teams found, show the default dashboard with a message
    return (
        <div className="flex min-h-screen w-full bg-background selection:bg-accent-teal/20 selection:text-foreground">
            <TeamsSidebar />

            <SidebarInset className="flex-1 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
                    <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] bg-accent-teal/5 blur-[120px] rounded-full animate-pulse-slow" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] bg-blue-500/5 blur-[120px] rounded-full animate-pulse-slow" />
                </div>

                <div className="relative z-10 flex min-h-screen flex-col">
                    <header className="sticky top-0 z-40 h-16 border-b border-border/60 bg-background/90 backdrop-blur-md">
                        <div className="mx-auto flex h-full w-full max-w-[1600px] items-center justify-between px-4 sm:px-6 lg:px-8">
                            <div className="flex items-center gap-3">
                                <SidebarTrigger className="-ml-1" />
                                <div className="flex flex-col">
                                    <h1 className="text-sm font-bold tracking-wide uppercase">Teams Dashboard</h1>
                                    <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">Unified Workspace</span>
                                </div>
                            </div>
                            <Suspense fallback={<AuthProfileButtonSkeleton />}>
                                <AuthProfileButton />
                            </Suspense>
                        </div>
                    </header>

                    <main className="flex-1 overflow-y-auto">
                        <div className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
                            <TeamManagement />
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
} 

'use client'

import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { BarChart3, Compass, Layers3, Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import Hero from './Hero'

const Features = dynamic(() => import('./Features'))
const AnalysisDemo = dynamic(() => import('./AnalysisDemo'))
const CTA = dynamic(() => import('./CTA'))

const navItems = [
  { id: 'overview', label: 'Overview', icon: Compass },
  { id: 'analysis', label: 'Analysis', icon: BarChart3 },
  { id: 'features', label: 'Features', icon: Layers3 },
  { id: 'action', label: 'Get Access', icon: Sparkles },
] as const

export default function HomeContent() {
  const router = useRouter()
  const [activeSection, setActiveSection] = useState<(typeof navItems)[number]['id']>('overview')

  const handleLogin = () => {
    router.push('/authentication?next=dashboard')
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting)
        if (visible?.target?.id) {
          setActiveSection(visible.target.id as (typeof navItems)[number]['id'])
        }
      },
      { rootMargin: '-35% 0px -50% 0px', threshold: 0.1 }
    )

    navItems.forEach((item) => {
      const element = document.getElementById(item.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="relative overflow-x-hidden bg-base text-fg-primary selection:bg-primary/30">
      <div className="pointer-events-none fixed inset-0 opacity-[0.02] bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:50px_50px]" />

      <main className="relative z-10 mx-auto grid w-full max-w-[1440px] grid-cols-1 px-3 pb-8 sm:px-4 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-6 lg:px-6">
        <aside className="sticky top-28 hidden h-[calc(100vh-8.5rem)] self-start overflow-hidden rounded-2xl border border-white/10 bg-[#030303] shadow-2xl lg:flex lg:flex-col">
          <div className="h-24 border-b border-white/5 px-5">
            <div className="flex h-full items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/35 bg-primary/10 text-primary">
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-black tracking-tight text-white">Home Panel</p>
                <p className="mt-0.5 text-[10px] font-black uppercase tracking-[0.17em] text-zinc-500">Session Active</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
            <p className="px-3 pb-2 text-[9px] font-black uppercase tracking-[0.2em] text-zinc-600">Home Sections</p>
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = activeSection === item.id
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={cn(
                    'relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-medium transition-all duration-200',
                    isActive ? 'bg-gradient-to-r from-primary/15 to-transparent text-white' : 'text-zinc-500 hover:bg-white/5 hover:text-zinc-200'
                  )}
                >
                  {isActive && <span className="absolute inset-y-2 left-0 w-0.5 rounded-r-full bg-primary" />}
                  <Icon className={cn('h-4 w-4', isActive ? 'text-primary' : 'text-zinc-500')} />
                  <span>{item.label}</span>
                </a>
              )
            })}
          </nav>

          <div className="border-t border-white/5 bg-[#020202] p-4">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-600">Quick Note</p>
            <p className="mt-2 text-xs text-zinc-400">Use this sidebar to jump sections without changing the home navbar or footer.</p>
          </div>
        </aside>

        <div className="min-w-0">
          <section id="overview" className="scroll-mt-36">
            <Hero onStart={handleLogin} />
          </section>

          <section id="analysis" className="scroll-mt-32">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.05 }}
            >
              <AnalysisDemo />
            </motion.div>
          </section>

          <section id="features" className="scroll-mt-32">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <Features />
            </motion.div>
          </section>

          <section id="action" className="scroll-mt-32">
            <CTA onStart={handleLogin} />
          </section>
        </div>
      </main>
    </div>
  )
}

'use client'

import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Hero from './Hero'

const Features = dynamic(() => import('./Features'))
const AnalysisDemo = dynamic(() => import('./AnalysisDemo'))
const HowItWorks = dynamic(() => import('./HowItWorks'))
const CTA = dynamic(() => import('./CTA'))

export default function HomeContent() {
  const router = useRouter()

  const handleLogin = () => {
    router.push('/authentication?next=dashboard')
  }

  return (
    <div className="relative overflow-x-hidden bg-base text-fg-primary selection:bg-primary/30">
      <div className="pointer-events-none fixed inset-0 opacity-[0.02] bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:46px_46px]" />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(950px_circle_at_18%_-10%,rgba(56,189,248,0.16),transparent_55%),radial-gradient(850px_circle_at_88%_0%,rgba(16,185,129,0.14),transparent_52%)]" />

      <main className="relative z-10 mx-auto w-full max-w-[1400px]">
        <Hero onStart={handleLogin} />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <AnalysisDemo />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.05 }}
        >
          <Features />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <HowItWorks />
        </motion.div>

        <CTA onStart={handleLogin} />
      </main>
    </div>
  )
}

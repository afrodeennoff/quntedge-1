'use client'

import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Hero from './Hero'

const Features = dynamic(() => import('./Features'))
const AnalysisDemo = dynamic(() => import('./AnalysisDemo'))
const CTA = dynamic(() => import('./CTA'))

export default function HomeContent() {
  const router = useRouter()

  const handleLogin = () => {
    router.push('/authentication?next=dashboard')
  }

  return (
    <div className="relative overflow-x-hidden bg-base text-fg-primary selection:bg-primary/30">
      <div className="pointer-events-none fixed inset-0 opacity-[0.02] bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:50px_50px]" />

      <main className="relative z-10 mx-auto w-full max-w-[1400px]">
        <Hero onStart={handleLogin} />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <Features />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.05 }}
        >
          <AnalysisDemo />
        </motion.div>

        <CTA onStart={handleLogin} />
      </main>
    </div>
  )
}

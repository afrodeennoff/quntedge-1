'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Gauge, LineChart, Radar, Sparkles, Target } from 'lucide-react'

interface HeroProps {
  onStart: () => void
}

const metrics = [
  { label: 'Execution Quality', value: '94.1', delta: '+9.2%' },
  { label: 'Rule Adherence', value: '97.6%', delta: '+4.8%' },
  { label: 'Emotion Drift Alerts', value: '2', delta: '-63%' },
]

export default function Hero({ onStart }: HeroProps) {
  return (
    <section className="relative overflow-hidden pb-14 pt-28 sm:pt-34 lg:pb-18">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-220px] h-[500px] w-[min(1080px,96vw)] -translate-x-1/2 rounded-full bg-primary/14 blur-[120px]" />
        <div className="absolute left-[14%] top-[18%] h-56 w-56 rounded-full bg-sky-500/10 blur-[90px]" />
        <div className="absolute right-[12%] top-[24%] h-52 w-52 rounded-full bg-emerald-400/10 blur-[90px]" />
      </div>

      <div className="container-fluid relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-4xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/35 bg-gradient-to-r from-primary/15 via-primary/12 to-sky-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.22em] text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            Built For Serious Futures Traders
          </span>

          <h1 className="mt-5 text-fluid-4xl font-black leading-[0.92] tracking-tight sm:text-fluid-6xl lg:text-fluid-7xl">
            Your Trading Desk,
            <br />
            <span className="bg-gradient-to-r from-sky-300 via-primary to-emerald-300 bg-clip-text text-transparent">
              Powered By Execution AI
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-3xl text-base text-muted-foreground sm:text-lg">
            Qunt Edge gives you the same operating edge top traders build manually: clean imports, live behavioral signals,
            and AI-led reviews that expose what to fix before PnL pays the price.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              onClick={onStart}
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary via-primary to-emerald-400 px-6 text-[11px] font-black uppercase tracking-[0.15em] text-primary-foreground transition-opacity hover:opacity-90 sm:w-auto"
            >
              Start Free Audit
              <ArrowRight className="h-4 w-4" />
            </button>

            <Link
              href="/pricing"
              className="inline-flex h-11 w-full items-center justify-center rounded-xl border border-border/70 px-6 text-[11px] font-black uppercase tracking-[0.15em] text-foreground transition-colors hover:bg-muted/70 sm:w-auto"
            >
              See Plans
            </Link>
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] font-black uppercase tracking-[0.18em] text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><Target className="h-3.5 w-3.5 text-primary" /> Tradovate</span>
            <span className="inline-flex items-center gap-1.5"><Target className="h-3.5 w-3.5 text-primary" /> Rithmic</span>
            <span className="inline-flex items-center gap-1.5"><Target className="h-3.5 w-3.5 text-primary" /> IBKR</span>
            <span className="inline-flex items-center gap-1.5"><Target className="h-3.5 w-3.5 text-primary" /> NinjaTrader</span>
          </div>
        </motion.div>

        <motion.aside
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="mx-auto mt-9 max-w-3xl rounded-2xl border border-border/70 bg-gradient-to-b from-card/90 to-card/75 p-4 shadow-[0_24px_65px_-35px_hsl(var(--primary)/0.55)] sm:p-5"
        >
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Live Desk Snapshot</p>
              <h2 className="mt-1 text-lg font-black tracking-tight">Today's Performance Pulse</h2>
            </div>
            <span className="rounded-lg border border-primary/30 bg-primary/12 px-2 py-1 text-[10px] font-black uppercase tracking-[0.15em] text-primary">
              Real-Time
            </span>
          </div>

          <div className="grid gap-2.5 sm:grid-cols-3">
            {metrics.map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-border/70 bg-background/50 px-4 py-3 transition-all duration-150 ease-in-out hover:-translate-y-0.5 hover:border-primary/25 hover:bg-background/65 active:scale-[0.99]"
              >
                <span className="text-xs text-muted-foreground">{item.label}</span>
                <div className="mt-2 flex items-end justify-between gap-2">
                  <p className="text-base font-black leading-none">{item.value}</p>
                  <p className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-[0.12em] text-primary">
                    <LineChart className="h-3 w-3" />
                    {item.delta}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
            <div className="rounded-xl border border-primary/25 bg-primary/10 px-4 py-3">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-primary">AI Insight</p>
              <p className="mt-1 text-sm text-foreground/90">
                Sessions with a defined pre-open checklist show <span className="font-black text-primary">31% tighter risk dispersion</span> in the last 30 days.
              </p>
            </div>
            <div className="rounded-xl border border-sky-500/25 bg-sky-500/10 px-4 py-3">
              <p className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-sky-300">
                <Gauge className="h-3.5 w-3.5" />
                Focus Signal
              </p>
              <p className="mt-1 text-sm text-foreground/90">
                <span className="font-black text-sky-300">09:45–10:25</span> remains your highest-conversion window by setup quality and follow-through.
              </p>
            </div>
          </div>

          <div className="mt-2 rounded-xl border border-emerald-400/25 bg-emerald-400/10 px-4 py-3">
            <p className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-emerald-300">
              <Radar className="h-3.5 w-3.5" />
              Suggestion
            </p>
            <p className="mt-1 text-sm text-foreground/90">
              Use adaptive sizing after two off-plan entries to protect consistency without shutting down momentum.
            </p>
          </div>
        </motion.aside>
      </div>
    </section>
  )
}

import { motion } from 'framer-motion'
import { BarChart3, BellRing, Brain, CalendarCheck2, Database, LayoutDashboard, Users } from 'lucide-react'

const features = [
  {
    title: 'One-Click Trade Sync',
    subtitle: 'Connected Data',
    desc: 'Pull fills from leading brokers and prop firm platforms without manual spreadsheet cleanup.',
    icon: Database,
  },
  {
    title: 'Execution Intelligence',
    subtitle: 'AI Analysis',
    desc: 'Track discipline, setup quality, and expectancy inside one desk-grade review workspace.',
    icon: BarChart3,
  },
  {
    title: 'Daily Debrief Workflow',
    subtitle: 'Review System',
    desc: 'Convert every session into structured feedback loops you can act on next market open.',
    icon: CalendarCheck2,
  },
  {
    title: 'Context-Aware Journaling',
    subtitle: 'Behavior Layer',
    desc: 'Tag emotions, bias, and confidence, then map them directly to execution outcomes.',
    icon: Brain,
  },
  {
    title: 'Custom Command Center',
    subtitle: 'Desk Control',
    desc: 'Build role-specific dashboards with widgets for risk, setups, behavior, and performance.',
    icon: LayoutDashboard,
  },
  {
    title: 'Coach + Team View',
    subtitle: 'Collaboration',
    desc: 'Track consistency across traders, enforce review standards, and flag coaching moments.',
    icon: Users,
  },
]

export default function Features() {
  return (
    <section id="features" className="relative border-b border-border/70 bg-card/20 py-fluid-xl">
      <div id="data-import" className="absolute -top-24" />
      <div id="daily-performance" className="absolute -top-24" />
      <div id="ai-journaling" className="absolute -top-24" />

      <div className="container-fluid">
        <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-primary">Platform Capabilities</p>
            <h2 className="mt-3 text-fluid-2xl font-black tracking-tight sm:text-fluid-4xl">
              Professional Infrastructure
              <span className="text-muted-foreground"> For Discretionary Traders</span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-muted-foreground">
            Inspired by institutional workflow design: fewer clicks, higher signal density, better decisions.
          </p>
        </div>

        <div className="mb-6 inline-flex items-center gap-2 rounded-xl border border-sky-500/25 bg-sky-500/10 px-3 py-2 text-[11px] font-black uppercase tracking-[0.15em] text-sky-300">
          <BellRing className="h-3.5 w-3.5" />
          New: AI Trade Replay + Bias Alerts
        </div>

        <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <motion.article
                key={feature.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.35 }}
                whileHover={{ y: -3 }}
                className="group rounded-2xl border border-border/70 bg-gradient-to-b from-card/90 to-card/70 p-5 transition-all duration-150 ease-in-out hover:border-primary/30 hover:bg-card/95 active:scale-[0.99]"
              >
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg border border-primary/25 bg-gradient-to-br from-primary/20 to-sky-500/15 text-primary">
                  <Icon className="h-4.5 w-4.5" />
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-muted-foreground transition-colors group-hover:text-primary">
                  {feature.subtitle}
                </p>
                <h3 className="mt-2 text-lg font-black tracking-tight">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.desc}</p>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface CTAProps {
  onStart: () => void
}

export default function CTA({ onStart }: CTAProps) {
  return (
    <section className="py-fluid-xl">
      <div className="container-fluid">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-3xl border border-border/70 bg-gradient-to-br from-card/90 via-card/80 to-card/65 px-6 py-10 sm:px-10 sm:py-12"
        >
          <div className="pointer-events-none absolute -right-24 -top-16 h-64 w-64 rounded-full bg-primary/15 blur-[90px]" />
          <div className="pointer-events-none absolute -left-20 bottom-0 h-56 w-56 rounded-full bg-sky-500/15 blur-[100px]" />

          <div className="relative z-10 text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-primary">Ready To Upgrade Your Process</p>
            <h2 className="mt-3 text-fluid-3xl font-black leading-[0.95] tracking-tight sm:text-fluid-5xl">
              Trade With More Clarity,
              <br />
              <span className="text-muted-foreground">Control, And Confidence</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground sm:text-base">
              Start your behavior-first audit stack and discover exactly what is improving your edge and what is leaking it.
            </p>

            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button
                onClick={onStart}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary via-primary to-emerald-400 px-7 text-[11px] font-black uppercase tracking-[0.16em] text-primary-foreground transition-opacity hover:opacity-90"
              >
                Start Your Trial
                <ArrowRight className="h-4 w-4" />
              </button>
              <Link
                href="/pricing"
                className="inline-flex h-11 items-center justify-center rounded-xl border border-border/70 px-7 text-[11px] font-black uppercase tracking-[0.16em] text-foreground transition-colors hover:bg-muted/70"
              >
                Compare Plans
              </Link>
            </div>

            <div className="mx-auto mt-5 flex max-w-2xl flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[10px] font-black uppercase tracking-[0.16em] text-muted-foreground">
              <span>no card required</span>
              <span className="h-1 w-1 rounded-full bg-border" />
              <span>setup in minutes</span>
              <span className="h-1 w-1 rounded-full bg-border" />
              <span>cancel anytime</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

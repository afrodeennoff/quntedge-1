"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AddWidgetSheet } from "./add-widget-sheet"
import ImportButton from "./import/import-button"
import { ShareButton } from "./share-button"
import { useDashboard } from "../dashboard-context"
import { useI18n } from "@/locales/client"
import { useData } from "@/context/data-provider"
import { CloudUpload, Share2, LayoutGrid, Sparkles } from "lucide-react"

const cardMotion = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
}

export function QuickActionCards() {
  const t = useI18n()
  const { addWidget, isCustomizing, layouts } = useDashboard()
  const { isPlusUser } = useData()

  const currentLayout = layouts || { desktop: [], mobile: [] }

  return (
    <section className="mb-5 mt-1">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
        <motion.div {...cardMotion}>
          <Card className="h-full border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 to-background">
            <CardHeader className="pb-3">
              <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-400/40 bg-cyan-400/15 text-cyan-300">
                <CloudUpload className="h-4 w-4" />
              </div>
              <CardTitle className="text-base">{t("import.title")}</CardTitle>
              <CardDescription>Bring in your trade history from broker sync or CSV files.</CardDescription>
            </CardHeader>
            <CardContent>
              <ImportButton />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div {...cardMotion} transition={{ delay: 0.06 }}>
          <Card className="h-full border-emerald-400/20 bg-gradient-to-br from-emerald-500/10 to-background">
            <CardHeader className="pb-3">
              <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-400/40 bg-emerald-400/15 text-emerald-300">
                <Share2 className="h-4 w-4" />
              </div>
              <CardTitle className="text-base">{t("share.title")}</CardTitle>
              <CardDescription>Create a private or public link to share dashboard results.</CardDescription>
            </CardHeader>
            <CardContent>
              <ShareButton variant="outline" size="default" currentLayout={currentLayout} />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div {...cardMotion} transition={{ delay: 0.12 }}>
          <Card className="h-full border-violet-400/20 bg-gradient-to-br from-violet-500/10 to-background">
            <CardHeader className="pb-3">
              <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-violet-400/40 bg-violet-400/15 text-violet-300">
                <LayoutGrid className="h-4 w-4" />
              </div>
              <CardTitle className="text-base">Widget Card</CardTitle>
              <CardDescription>Add widgets to your dashboard layout with one click.</CardDescription>
            </CardHeader>
            <CardContent>
              <AddWidgetSheet
                onAddWidget={addWidget}
                isCustomizing={isCustomizing}
                trigger={<Button variant="outline">{t("widgets.addWidget")}</Button>}
              />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div {...cardMotion} transition={{ delay: 0.18 }}>
          <Card className="h-full border-amber-400/20 bg-gradient-to-br from-amber-500/10 to-background">
            <CardHeader className="pb-3">
              <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-amber-400/40 bg-amber-400/15 text-amber-300">
                <Sparkles className="h-4 w-4" />
              </div>
              <CardTitle className="text-base">Pricing Card</CardTitle>
              <CardDescription>
                {isPlusUser()
                  ? "Manage your subscription, billing cycle, and invoices."
                  : "Upgrade to unlock advanced widgets and team features."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline">
                <Link href="/dashboard/billing">{isPlusUser() ? "Manage Plan" : "View Pricing"}</Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

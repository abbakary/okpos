"use client"

import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardStats } from "@/components/dashboard-stats"
import { DashboardActions } from "@/components/dashboard-actions"
import { DashboardCharts } from "@/components/dashboard-charts"

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <DashboardHeader />

        {/* Main Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Breadcrumb */}
            <div className="flex items-center text-sm text-muted-foreground">
              <span>Main</span>
              <span className="mx-2">/</span>
              <span className="text-foreground">Tracking Dashboard</span>
            </div>

            {/* Action Buttons */}
            <DashboardActions />

            {/* Statistics Cards */}
            <DashboardStats />

            {/* Charts */}
            <DashboardCharts />
          </div>
        </main>
      </div>
    </div>
  )
}

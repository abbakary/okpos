"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown } from "lucide-react"
import { useUser } from "@/lib/user-context"

interface StatCardProps {
  title: string
  value: string | number
  subtitle?: string
  trend?: {
    value: number
    isPositive: boolean
  }
  color?: "blue" | "green" | "orange" | "teal"
}

function StatCard({ title, value, subtitle, trend, color = "blue" }: StatCardProps) {
  const colorClasses = {
    blue: "text-blue-600",
    green: "text-green-600",
    orange: "text-orange-600",
    teal: "text-primary",
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {trend && (
          <Badge variant={trend.isPositive ? "default" : "destructive"} className="text-xs">
            {trend.isPositive ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
            {Math.abs(trend.value)}%
          </Badge>
        )}
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${colorClasses[color]}`}>{value}</div>
        {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
      </CardContent>
    </Card>
  )
}

export function DashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Today's Services"
        value="26"
        subtitle="Car Services: 18    Tyre Sales: 6"
        color="blue"
        trend={{ value: 12, isPositive: true }}
      />
      <StatCard
        title="Active Job Cards"
        value="15"
        subtitle="In Progress: 12    Quality Check: 3"
        color="orange"
        trend={{ value: 8, isPositive: true }}
      />
      <StatCard
        title="Daily Revenue"
        value="TSH 2,450,000"
        subtitle="Services: TSH 1,800,000    Parts: TSH 650,000"
        color="green"
        trend={{ value: 15, isPositive: true }}
      />
      <StatCard
        title="Customer Visits"
        value="48"
        subtitle="New: 32    Returning: 16"
        color="teal"
        trend={{ value: 5, isPositive: true }}
      />
    </div>
  )
}

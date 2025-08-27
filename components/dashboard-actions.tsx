"use client"

import { Button } from "@/components/ui/button"
import { Plus, Search, FileText, Clock, Shield, Eye, Package, BarChart3, Users } from "lucide-react"
import Link from "next/link"
import { useUser } from "@/lib/user-context"

export function DashboardActions() {
  return (
    <div className="flex gap-4">
      <Link href="/customers">
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Plus className="h-4 w-4 mr-2" />
          Register Customer & Create Order
        </Button>
      </Link>
      <Link href="/customers">
        <Button
          variant="outline"
          className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
        >
          <Search className="h-4 w-4 mr-2" />
          Search Existing Customer
        </Button>
      </Link>
      <Link href="/orders">
        <Button className="bg-orange-500 hover:bg-orange-600 text-white">
          <FileText className="h-4 w-4 mr-2" />
          Manage Job Cards
        </Button>
      </Link>
      <Link href="/time-tracking">
        <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
          <Clock className="h-4 w-4 mr-2" />
          Time Tracking
        </Button>
      </Link>
    </div>
  )
}

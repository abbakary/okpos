"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  LayoutDashboard,
  Users,
  FileText,
  ClipboardList,
  Package,
  BarChart3,
  Car,
  Wrench,
} from "lucide-react"

interface SidebarProps {
  className?: string
}

const navigation = [
  {
    title: "GENERAL",
    items: [
      {
        title: "Dashboard",
        href: "/",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    title: "CUSTOMER & ORDERS",
    items: [
      {
        title: "Customer Registration",
        href: "/customers",
        icon: Users,
        hasSubmenu: true,
      },
      {
        title: "Orders & Services",
        href: "/orders",
        icon: ClipboardList,
        hasSubmenu: true,
      },
    ],
  },
  {
    title: "OPERATIONS",
    items: [
      {
        title: "Job Cards & Tracking",
        href: "/job-cards",
        icon: Wrench,
        hasSubmenu: true,
      },
      {
        title: "Time Tracking",
        href: "/time-tracking",
        icon: Car,
        hasSubmenu: true,
      },
    ],
  },
  {
    title: "FINANCIAL",
    items: [
      {
        title: "Invoices & Payments",
        href: "/invoices",
        icon: FileText,
        hasSubmenu: true,
      },
      {
        title: "Inventory Management",
        href: "/inventory",
        icon: Package,
        hasSubmenu: true,
      },
    ],
  },
  {
    title: "REPORTS",
    items: [
      {
        title: "Analytics & Reports",
        href: "/reports",
        icon: BarChart3,
        hasSubmenu: true,
      },
    ],
  },
]

export function DashboardSidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const [expandedSections, setExpandedSections] = useState<string[]>([])

  const toggleSection = (title: string) => {
    setExpandedSections((prev) => (prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]))
  }

  return (
    <div className={cn("flex h-full w-64 flex-col bg-sidebar border-r border-sidebar-border", className)}>
      {/* Logo */}
      <div className="flex h-16 items-center px-6 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary">
            <Car className="h-5 w-5 text-sidebar-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-sidebar-foreground">AutoCare</span>
        </div>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-4 py-4">
        <nav className="space-y-6">
          {navigation.map((section) => (
            <div key={section.title}>
              <h3 className="mb-2 px-2 text-xs font-semibold text-sidebar-foreground/70 uppercase tracking-wider">
                {section.title}
              </h3>
              <div className="space-y-1">
                {section.items.map((item) => (
                  <div key={item.href}>
                    <Link href={item.href}>
                      <Button
                        variant="ghost"
                        className={cn(
                          "w-full justify-start gap-3 h-10 px-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                          pathname === item.href &&
                            "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary hover:text-sidebar-primary-foreground",
                        )}
                        onClick={() => item.hasSubmenu && toggleSection(item.title)}
                      >
                        <item.icon className="h-4 w-4 flex-shrink-0" />
                        <span className="flex-1 text-left text-sm">{item.title}</span>
                        {item.hasSubmenu && (
                          <div className="flex-shrink-0 w-6 h-4 flex items-center justify-center">
                            <div
                              className={cn(
                                "w-4 h-2 rounded-full transition-all duration-200",
                                expandedSections.includes(item.title)
                                  ? "bg-sidebar-primary-foreground"
                                  : "bg-sidebar-foreground/40"
                              )}
                            />
                          </div>
                        )}
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </ScrollArea>

      <div className="border-t border-sidebar-border p-4">
        <div className="flex items-center gap-3 px-2 py-2">
          <div className="h-8 w-8 rounded-full bg-sidebar-primary flex items-center justify-center">
            <span className="text-sm font-medium text-sidebar-primary-foreground">A</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">Admin User</p>
            <p className="text-xs text-sidebar-foreground/70 truncate">admin@autocare.com</p>
          </div>
        </div>
      </div>
    </div>
  )
}

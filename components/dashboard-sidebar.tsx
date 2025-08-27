"use client"

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
  FolderOpen,
  MessageSquare,
  Bookmark,
  Phone,
  CheckSquare,
  Calendar,
  Share2,
  Grid3X3,
} from "lucide-react"

interface SidebarProps {
  className?: string
}

const navigation = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "File Manager",
    href: "/file-manager",
    icon: FolderOpen,
  },
  {
    title: "Kanban Board",
    href: "/kanban",
    icon: Grid3X3,
  },
  {
    title: "Ecommerce",
    href: "/ecommerce",
    icon: Package,
  },
  {
    title: "Letter Box",
    href: "/letter-box",
    icon: FileText,
  },
  {
    title: "Chat",
    href: "/chat",
    icon: MessageSquare,
  },
  {
    title: "Users",
    href: "/customers",
    icon: Users,
  },
  {
    title: "Bookmarks",
    href: "/orders",
    icon: Bookmark,
  },
  {
    title: "Contacts",
    href: "/contacts",
    icon: Phone,
  },
  {
    title: "Tasks",
    href: "/job-cards",
    icon: CheckSquare,
  },
  {
    title: "Calendar",
    href: "/calendar",
    icon: Calendar,
  },
  {
    title: "Social App",
    href: "/social",
    icon: Share2,
  },
]

export function DashboardSidebar({ className }: SidebarProps) {
  const pathname = usePathname()

  return (
    <div className={cn("flex h-full w-64 flex-col bg-teal-600 text-white", className)}>
      {/* Logo */}
      <div className="flex h-16 items-center px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center">
            <div className="w-6 h-6 bg-yellow-400 rounded-sm flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
          </div>
          <span className="text-xl font-bold text-white">Riho</span>
        </div>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-4 py-4">
        <nav className="space-y-1">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3 h-12 px-4 text-white/90 hover:bg-white/10 hover:text-white rounded-lg font-medium",
                  pathname === item.href &&
                    "bg-white/20 text-white hover:bg-white/20",
                )}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                <span className="flex-1 text-left">{item.title}</span>
              </Button>
            </Link>
          ))}
        </nav>
      </ScrollArea>

      {/* User Profile */}
      <div className="p-4">
        <div className="flex items-center gap-3 px-2 py-3 rounded-lg bg-white/10">
          <div className="h-8 w-8 rounded-full bg-yellow-400 flex items-center justify-center">
            <span className="text-sm font-semibold text-teal-600">A</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">Admin User</p>
            <p className="text-xs text-white/70 truncate">admin@autocare.com</p>
          </div>
        </div>
      </div>
    </div>
  )
}

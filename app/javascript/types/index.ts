import type { LucideIcon } from "lucide-react"

export interface Auth {
  user: User | null
  session: Pick<Session, "id"> | null
}

export interface BreadcrumbItem {
  title: string
  href: string
}

export interface NavItem {
  title: string
  href: string
  icon?: LucideIcon | null
  isActive?: boolean
}

export interface FlashData {
  alert?: string
  notice?: string
}

export interface SharedProps {
  auth: Auth
  [key: string]: unknown
}

export interface User {
  id: number
  name: string
  email: string
  avatar?: string
  verified: boolean
  created_at: string
  updated_at: string
  hackatime_projects?: { name: string; text: string; hours: number; minutes: number; total_seconds: number;  }[]
  [key: string]: unknown
}

export interface ProjectForm {
  id?: number
  name: string
  description: string
  demo_link: string
  repo_link: string
  is_unlisted: boolean
  tags: string[]
  hackatime_projects: string[]
}
export interface Devlog {
  id?: number
  title: string
  body: string
  images: string[]
}

export interface DevlogDetail {
  id: number
  title: string
  body: string
  images: string[]
  created_at: string
}

export interface ProjectDetail {
  id: number
  name: string
  description: string
  demo_link: string | null
  repo_link: string | null
  is_unlisted: boolean
  devlogs: DevlogDetail[]
  tags: string[]
  user_display_name: string
  created_at: string
  hours: number
}

export interface Session {
  id: string
  user_agent: string
  ip_address: string
  created_at: string
}

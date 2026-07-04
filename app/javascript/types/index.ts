import type { LucideIcon } from 'lucide-react'

export interface Auth {
  user: User | null
  session: Pick<Session, 'id'> | null
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
  hackatime_projects?: { name: string; text: string; hours: number; minutes: number; total_seconds: number }[]
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
export interface ShopItem {
  id?: number
  name: string
  description: string
  image: string
  price: number
  active:boolean
}
export interface Ship {
  id?: number
  approved_seconds: number
  feedback: string
  frozen_demo_link: string
  frozen_hca_data: string
  frozen_repo_link: string
  frozen_screenshot: string
  justification: string
  status: string
  project_id: number
  reviewer_id: number
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
  ships: Ship[]
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

export interface PagyProps {
  page: number
  next: number | null
  prev: number | null
  pages: number
  count: number
}

export interface SharedProps {
  errors: any
  flash: Record<string, string>
  sign_out_path: string
}

export interface ProjectCard {
  id: number
  name: string
  description: string | null
  tags: string[]
  user_display_name: string
  ships: Ship[]
  is_unlisted: boolean
  discarded_at: string | null
  hours_logged: number
  devlogs_count: number
}

export interface AdminProjectRow extends ProjectCard {
  is_discarded: boolean
  user_id: number
  created_at: string
}

export interface AdminProjectDetail extends AdminProjectRow {
  demo_link: string | null
  repo_link: string | null
}

export interface AdminShipRow {
  id: number
  status: string
  feedback: string | null
  project_name: string
  user_display_name: string
  reviewer_display_name: string | null
  created_at: string
}

export interface AdminShipDetail extends AdminShipRow {
  approved_seconds: number | null
  justification: string | null
  frozen_demo_link: string | null
  frozen_repo_link: string | null
}

export interface AdminUserRow {
  id: number
  name: string
  email: string
  display_name: string
  is_discarded: boolean
  roles: string[]
  projects_count: number
  created_at: string
}

export interface AdminUserDetail extends AdminUserRow {
  avatar: string
  timezone: string
  is_banned: boolean
  discarded_at: string | null
}

export interface ShipForm {
  id: number
  project_name: string
  user_display_name: string
  status: string
  feedback: string | null
  justification: string | null
  approved_seconds: number | null
  setData: (key: string, value: any) => void
  patch: (url: string) => void
}

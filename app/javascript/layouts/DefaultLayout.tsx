import type { ReactNode } from 'react'
import Nav from '@/components/Nav'
import { Toaster } from '@/components/ui/sonner'
import { useFlash } from '@/hooks/use-flash'

export default function DefaultLayout({ children }: { children: ReactNode }) {
  useFlash()
  return (
    <>
      <Nav />
      <main>{children}</main>
      <Toaster richColors theme="light" position="top-right" />
    </>
  )
}

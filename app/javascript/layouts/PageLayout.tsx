import type { ReactNode } from 'react'
import { Toaster } from '@/components/ui/sonner'
import { useFlash } from '@/hooks/use-flash'
import { useState } from 'react'
import { Link, usePage } from '@inertiajs/react'

export default function PageLayout({ children }: { children: ReactNode }) {
  useFlash()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const page = usePage<{ auth: { user: { display_name: string } | null } }>()
  const { url } = page
  const { auth } = page.props
  const user = auth?.user

  const navLinks = [
    { href: '/projects', label: 'PROJECTS' },
    { href: '/shop', label: 'SHOP' },
    { href: '/explore', label: 'EXPLORE' },
    { href: '/admin/reviews', label: 'REVIEW' },
    { href: '/admin', label: 'ADMIN' },
  ]

  return (
    <>
      <main>
        <div className="page-container">
          <nav className="ascension-nav">
            <div className="ascension-nav__left">
              <img src="/static-assets/wordmark.png" alt="Hack Club Ascension" className="ascension-nav__logo" />
              <div className="ascension-nav__links">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`ascension-nav__link${url.startsWith(link.href) ? ' ascension-nav__link--active' : ''}`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            {user && (
              <div className="ascension-nav__right">
                <div className="user-pill">
                  <span className="user-pill__name">{user.display_name.toUpperCase()}</span>
                  <button
                    className={`user-pill__trigger ${dropdownOpen ? 'user-pill__trigger--open' : ''}`}
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    aria-label="Toggle user menu"
                  >
                    V
                  </button>
                </div>
                {dropdownOpen && (
                  <div className="user-pill__dropdown">
                    <Link href="/auth/signout" method="delete" as="button" className="user-pill__dropdown-item">
                      Sign Out
                    </Link>
                  </div>
                )}
              </div>
            )}
          </nav>

          {children}
        </div>
      </main>
      <Toaster richColors theme="light" position="top-right" />
    </>
  )
}

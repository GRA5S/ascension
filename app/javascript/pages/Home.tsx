import { Head, usePage, router } from '@inertiajs/react'

export default function Home() {
  const { sign_out_path } = usePage().props as { sign_out_path: string }

  const navItems = [
    { label: 'Projects', href: '/projects' },
    { label: 'Shop', href: '/shop' },
    { label: 'Explore', href: '/explore' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Logout', href: sign_out_path, isLogout: true },
  ]

  return (
    <>
      <Head title="Ascension - Home" />
      <div className="bgsmth flex h-screen w-screen items-center">
        <div className="pl-16">
          <img
            className="w-[67vw] drop-shadow-2xl -my-10 "
            src="https://cdn.hackclub.com/019c6372-90ca-7949-9112-49de381e591f/Untitled144_20260214170016.png"
            alt="Ascension"
          />

          <div className="relative mt-16">
            <div className="nav-items space-y-6">
              {navItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (item.isLogout) {
                      router.delete(item.href)
                    } else {
                      window.location.href = item.href
                    }
                  }}
                  className="nav-link block text-2xl font-bold uppercase tracking-widest text-white transition-all duration-300 hover:text-[#84bce4]"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="w-1/2" />
      </div>
    </>
  )
}

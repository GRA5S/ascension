import { useState } from 'react'
import { router, Link, usePage } from '@inertiajs/react'
import { ShopItem } from '@/types'
export default function Index({
  items,
}: {
  items: ShopItem[]
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const { auth } = usePage<{ auth: { user: { display_name: string } | null } }>().props
  const user = auth?.user
  return (
    <div className="shop-container">
      <nav className="ascension-nav">
        <div className="ascension-nav__left">
          <img src="/static-assets/wordmark.png" alt="Hack Club Ascension" className="ascension-nav__logo" />
          <div className="ascension-nav__links">
            <Link href="/projects" className="ascension-nav__link">
              PROJECTS
            </Link>
            <Link href="/shop" className="ascension-nav__link ascension-nav__link--active">
              SHOP
            </Link>
            <Link href="/explore" className="ascension-nav__link">
              EXPLORE
            </Link>
          </div>
        </div>
        {user && (
          <div className="ascension-nav__right">
            <div className="user-pill">
              <span className="user-pill__name">
                {user?.display_name ? user.display_name.toUpperCase() : 'ACCOUNT'}
              </span>
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
                <Link href="/auth/signout" method="delete" as="button" className="user-pill__dropdown-shop-item">
                  Sign Out
                </Link>
              </div>
            )}
          </div>
        )}
      </nav>

      <header className="flex flex-row">
        <h1 className="text-5xl">SHOP</h1>
        <div className="grow"></div>
        <h1 className="projects-header__heading projects-header--muted">{user?.currency} currency</h1>
          
      </header>

      <div className="shop-item-grid">
        {items.map((item) => {
          return (
            <div className="shop-item-card">
              <img
                src={item.image}
                alt=""
              />
              <div className="text">
                <div className="flex flex-row">
                  <h1>{item.name}</h1>
                  <div className="grow"></div>
                  <h1>{item.price} dolla</h1>
                </div>
                <p>{item.description}</p>
              </div>
              <div className="flex justify-center">
                <button className="my-2 px-2 h-10">
                  <h2 className="">Buy</h2>
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}

import { usePage } from '@inertiajs/react'
import { ShopItem } from '@/types'
import PageLayout from '@/layouts/PageLayout'
export default function ShopIndex({ items }: { items: ShopItem[] }) {
  const { auth } = usePage<{ auth: { user: { display_name: string } | null } }>().props
  const user = auth?.user
  return (
    <>
      <header className="flex flex-row">
        <h1 className="text-5xl">SHOP</h1>
        <div className="grow"></div>
        <h1 className="projects-header__heading projects-header--muted">{user?.currency} currency</h1>
      </header>

      <div className="shop-item-grid">
        {items.map((item) => (
          <div key={item.id} className="shop-item-card">
            <img src={item.image} alt="" />
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
                <h2>Buy</h2>
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
ShopIndex.layout = [PageLayout]

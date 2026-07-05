class ShopController < ApplicationController
  def index
    render inertia: "shop/index", props: {
      items: ShopItem.all.map { |i| serialize_items(i) }
    }
  end

  private

  def serialize_items(item)
    {
      id: item.id,
      name: item.name,
      description: item.description,
      image: item.image,
      price: item.price,
      active: item.active
    }
  end
end

class AddDescriptionToShopItems < ActiveRecord::Migration[8.1]
  def change
    add_column :shop_items, :description, :text
  end
end

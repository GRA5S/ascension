class CreateShopItems < ActiveRecord::Migration[8.1]
  def change
    create_table :shop_items do |t|
      t.string :name
      t.integer :price
      t.string :image
      t.boolean :active

      t.timestamps
    end
  end
end

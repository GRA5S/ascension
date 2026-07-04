# == Schema Information
#
# Table name: shop_items
#
#  id          :bigint           not null, primary key
#  active      :boolean
#  description :text
#  image       :string
#  name        :string
#  price       :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class ShopItem < ApplicationRecord
end

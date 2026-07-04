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
require "test_helper"

class ShopItemTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end

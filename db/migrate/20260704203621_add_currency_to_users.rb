class AddCurrencyToUsers < ActiveRecord::Migration[8.1]
  def change
    add_column :users, :currency, :integer
  end
end

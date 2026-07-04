class ChangeCurrencyDefaultAndNullOnUsers < ActiveRecord::Migration[8.1]
  def change
    change_column_default :users, :currency, from: nil, to: 0
    change_column_null :users, :currency, false, 0
  end
end
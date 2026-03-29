class CreateRsvps < ActiveRecord::Migration[8.1]
  def change
    create_table :rsvps do |t|
      t.string :email
      t.datetime :submitted_at
      t.string :ip_address
      t.text :user_agent
      t.jsonb :geolocation_data

      t.timestamps
    end
  end
end

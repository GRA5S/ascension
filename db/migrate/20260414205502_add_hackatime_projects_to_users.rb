class AddHackatimeProjectsToUsers < ActiveRecord::Migration[8.1]
  def change
    add_column :users, :hackatime_projects, :jsonb
  end
end

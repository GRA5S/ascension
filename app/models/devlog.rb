# == Schema Information
#
# Table name: devlogs
#
#  id         :bigint           not null, primary key
#  body       :text
#  images     :string           default([]), not null, is an Array
#  title      :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  project_id :bigint           not null
#
# Indexes
#
#  index_devlogs_on_project_id  (project_id)
#
# Foreign Keys
#
#  fk_rails_...  (project_id => projects.id)
#
class Devlog < ApplicationRecord
  has_paper_trail

  belongs_to :project

  validates :title, presence: true
end

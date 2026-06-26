class DevlogPolicy < ApplicationPolicy
  def create?
    record.project.present? && (admin? || record.project.user == user)
  end
end

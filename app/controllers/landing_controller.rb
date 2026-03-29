# frozen_string_literal: true

class LandingController < InertiaController
  allow_unauthenticated_access only: [:index]
  skip_before_action :redirect_banned_user!, only: [:index]

  def index
  end
end

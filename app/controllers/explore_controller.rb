class ExploreController < ApplicationController
  def index
    render inertia: "explore/Index"
  end
end

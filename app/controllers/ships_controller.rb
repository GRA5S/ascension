class ShipsController < ApplicationController
  before_action :authenticate_user!

  def create
    @project = current_user.projects.find(params[:project_id])
    authorize @project

    @ship = @project.ships.build(
      status: :pending,
      frozen_demo_link: @project.demo_link,
      frozen_repo_link: @project.repo_link,
      frozen_hca_data: current_user.hackatime_projects
    )

    if @ship.save
      redirect_to @project, notice: "Project submitted for review."
    else
      redirect_back fallback_location: @project, inertia: { errors: @ship.errors.messages }
    end
  end
end

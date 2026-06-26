class DevlogsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_project

  def create
    @devlog = @project.devlogs.build(devlog_params)
    authorize @devlog

    if @devlog.save
      redirect_to @project, notice: "Devlog created."
    else
      redirect_back fallback_location: @project, inertia: { errors: @devlog.errors.messages }
    end
  end

  private

  def set_project
    @project = Project.find(params[:project_id])
  end

  def devlog_params
    params.expect(devlog: [ :title, :body, images: [] ])
  end
end

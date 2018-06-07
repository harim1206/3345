class Api::V1::TracksController < ApplicationController
  before_action :set_track, only: [:show]

  def index
    render json: Track.all
  end

  def show
    render json: @track
  end

  private

  # def todo_params
  #   # whitelist params
  #   params.permit(:title, :created_by)
  # end

  def set_track
    @track = Track.find(params[:id])
  end

end

module Api
  module V1
    class TracksController < ApplicationController

      def index
        render json: Cat.all
      end

    end
  end
end

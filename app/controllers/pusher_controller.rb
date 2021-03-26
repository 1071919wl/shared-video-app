require 'pusher'
class PusherController < ApplicationController
  # skip_before_action :verify_authenticity_token
  protect_from_forgery :except => :auth

  def auth
    if current_user
      response = Pusher.authenticate(params[:channel_name], params[:socket_id])
      render json: response
    else
      render json: 'Forbidden', status: '403'
    end
  end
end

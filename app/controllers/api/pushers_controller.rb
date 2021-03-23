require 'pusher'
class PushersController < ApplicationController
  def auth
    if current_user
      response = Pusher.authenticate(params[:channel_name], params[:socket_id])
      # response = Pusher.authenticate("private-my-channel-will", params[:socket_id])
      render json: response
    else
      render text: 'Forbidden', status: '403'
    end
  end
end
#   def create
#     p '@@@@@@@@@@@@2@@@@@@@@@@@@HIT@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@'
#     if current_user
#       response = Pusher.authenticate(params[:channel_name], params[:socket_id])
#       render json: response
#     else
#       render text: 'Forbidden', status: '403'
#     end
#   end
# end
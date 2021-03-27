# require 'pusher'
# class PusherController < ApplicationController
#   # skip_before_action :verify_authenticity_token
#   protect_from_forgery :except => :auth

#   def auth
#     if current_user
#       response = Pusher.authenticate(params[:channel_name], params[:socket_id])
#       render json: response
#     else
#       render json: 'Forbidden', status: '403'
#     end
#   end
# end


require 'pusher'
class PusherController < ApplicationController
  # skip_before_action :verify_authenticity_token
  protect_from_forgery :except => :auth

  def auth
    if current_user
      response = Pusher.authenticate(params[:channel_name], params[:socket_id], {
        user_id: current_user.id, # => required
        user_info: { # => optional - for example
          name: current_user.username
        }
      })
      render json: response
    else
      render text: 'Forbidden', status: '403'
    end
  end
end

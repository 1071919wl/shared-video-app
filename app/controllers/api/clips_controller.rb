require 'pusher'

class Api::ClipsController < ApplicationController

    def index
        @clips = Clip.all
        render :index
    end

    def create
        # pusher = Pusher::Client.new(
        #     app_id: '1174180',
        #     key: '4efa8992028154c12bf1',
        #     secret: '549f1209e1dc27c33bb5',
        #     cluster: 'us3'
        # )
        # pusher.trigger('my-channel-will', 'my-event-will', {:message => 'YOOYOYYOOYOYOYO@@@@@@@@@@@@@@@@@@@@'})
        clip = Clip.new(clip_params)
        if clip.save
            render json: ["File uploaded!"]
        else
            render json: clip.errors.full_messages
        end
    end

    def show
        @clip = Clip.find(params[:id])
        render :show 
        # pusher = Pusher::Client.new(
        #     app_id: '1174180',
        #     key: '4efa8992028154c12bf1',
        #     secret: '549f1209e1dc27c33bb5',
        #     cluster: 'us3'
        # )
        # pusher.trigger('my-channel-will', 'my-event-will', {:message => 'YOOYOYYOOYOYOYO@@@@@@@@@@@@@@@@@@@@'})
        
    end



    def clip_params
        params.require(:clip).permit(:user_id, :title, :video_clip)
    end

end

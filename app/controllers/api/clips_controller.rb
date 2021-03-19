class Api::ClipsController < ApplicationController


    def index
        @clips = Clip.all
        render :index
    end

    def create
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
    end



    def clip_params
        params.require(:clip).permit(:user_id, :title, :video_clip)
    end

end

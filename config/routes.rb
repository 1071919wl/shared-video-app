Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
    namespace :api, defaults: {format: :json} do
      resources :users, only: [:create]
      resource :session, only: [:create, :destroy]
      
      # resources :pusher, only: [:create]

      resources :clips, only: [:show, :index, :create]
      post '/pusher/auth'
    end
  
    root "static_pages#root"
end

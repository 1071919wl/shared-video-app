require 'pusher'

pusher = Pusher::Client.new(
  app_id: '1174180',
  key: '4efa8992028154c12bf1',
  secret: '549f1209e1dc27c33bb5',
  cluster: 'us3'
)

class HelloWorldController < ApplicationController
  def create
    pusher.trigger('my-channel-will', 'my-event-will', {:message => 'FROM THE HELLOWORLD CONTROLLER'})
    
  end
end
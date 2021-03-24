require 'pusher'

# pusher = Pusher::Client.new(
#   app_id: '1174180',
#   key: '4efa8992028154c12bf1',
#   secret: '549f1209e1dc27c33bb5',
#   cluster: 'us3',
#   encrypted: true
# )

Pusher.app_id = '1174180'
Pusher.key = '4efa8992028154c12bf1'
Pusher.secret = '549f1209e1dc27c33bb5'

# pusher.trigger('my-channel', 'my-event', {
#   message: 'hello world'
# })
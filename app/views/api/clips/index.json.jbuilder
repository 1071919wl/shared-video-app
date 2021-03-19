json.array! @clips do |clip|
    json.extract! clip, :id, :user_id, :title
    json.video_clip url_for(clip.video_clip)
end
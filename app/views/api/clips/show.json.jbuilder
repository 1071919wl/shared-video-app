if @clip.video_clip.attached?
    json.id @clip.id
    json.user_id @clip.user_id
    json.title @clip.title
    json.video_clip url_for(@clip.video_clip)
end
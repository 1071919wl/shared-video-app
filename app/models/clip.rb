# == Schema Information
#
# Table name: clips
#
#  id         :bigint           not null, primary key
#  title      :string           not null
#  user_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Clip < ApplicationRecord

    validates :title, presence: true

    validates :user_id, presence: true


    belongs_to :user,
    foreign_key: :user_id,
    class_name: :User

    has_one_attached :video_clip



end

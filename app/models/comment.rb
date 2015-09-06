# == Schema Information
#
# Table name: comments
#
#  id         :integer          not null, primary key
#  card_id    :integer          not null
#  content    :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Comment < ActiveRecord::Base
	validates :card_id, :user_id, :content, presence: true

	belongs_to :card
	belongs_to :user
end

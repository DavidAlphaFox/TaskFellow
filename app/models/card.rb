class Card < ActiveRecord::Base
  validates :board_id, :title, :description, :ord, presence: true

  belongs_to :list
end

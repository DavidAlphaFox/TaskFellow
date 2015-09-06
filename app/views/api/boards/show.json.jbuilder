json.partial!("api/boards/board", model: @board)

json.lists do
  json.array!(@board.lists.order(:ord)) do |list|
    json.partial!("api/lists/list", model: list)

    json.cards do
      json.array!(list.cards.order(:ord)) do |card|
    	json.partial!("api/cards/card", model: card)

    	json.comments do
    		json.array!(card.comments) do |comment|
    			json.partial!("api/comments/comment", model: comment)

          json.user do
            json.partial!("api/users/user", model: comment.user)
          end
    		end
    	end
      end
	end
  end
end

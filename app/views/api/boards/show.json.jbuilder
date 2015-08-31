json.partial!("api/boards/board", model: @board)

json.lists do
  json.array!(@board.lists.order(:ord)) do |list|
    json.partial!("api/lists/list", model: list)

    json.cards do
      json.array!(list.cards.order(:ord)) do |card|
    	json.partial!("api/cards/card", model: card)
      end
	end
  end
end

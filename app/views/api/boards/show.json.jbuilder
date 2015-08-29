json.partial!("api/boards/board", model: @board)

json.lists do
  json.array!(@board.lists) do |list|
    json.partial!("api/lists/list", model: list)

    json.cards do
      json.array!(list.cards) do |card|
    	json.partial!("api/cards/card", model: card)
      end
	end
  end
end

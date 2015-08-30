json.array!(@cards) do |card|
	json.partial!("api/cards/card", model: card)
end
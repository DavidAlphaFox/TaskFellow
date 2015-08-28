json.partial!("api/boards/board", model: @board)

json.lists do
  json.array!(@lists) do |list|
    json.partial!("api/lists/list", model: list)
  end
end

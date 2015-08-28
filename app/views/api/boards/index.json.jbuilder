json.array!(@boards) do |board|
  json.partial!("api/boards/board", model: board)
end

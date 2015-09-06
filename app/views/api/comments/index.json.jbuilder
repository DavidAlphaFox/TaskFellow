json.array!(@comments) do |comment|
	json.partial!("api/comments/comment", model: comment)
end
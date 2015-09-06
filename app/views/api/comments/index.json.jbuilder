json.array!(@comments) do |comment|
	json.partial!("api/comments/comment", model: comment)

	json.user do
		json.partial!("api/users/user", model: comment.user)
	end
end
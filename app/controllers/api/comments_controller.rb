class Api::CommentsController < ApplicationController
	def index
		@comments = Comment.all
		render "index"
	end

	def create
		@comment = Comment.new(comment_params)
		@comment.user_id = current_user.id
		if Comment.last
			@comment.id = Comment.last.id + 1
		end
		if @comment.save
			render "show"
		else
			render :json => { error: @comment.errors.full_messages }, status: :unproccessable_entity
		end
	end

	def show
		@comment = Card.find(params[:id])
		render "show"
	end

	def update
		@comment = Comment.find(params[:id])
		if @comment.update(comment_params)
			render "show"
		else
			render :json => { error: @comment.errors.full_messages }, status: :unproccessable_entity
		end
	end

	def destroy
		@comment = Comment.find(params[:id])
		@comment.destroy
		render "show"
	end

	private
	def comment_params
		params.require(:comment).permit(:card_id, :user_id, :content)
	end
end

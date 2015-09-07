class Api::BoardsController < ApplicationController
  before_action :redirect_if_not_logged_in

  def index
    @boards = Board.all
    render "index"
  end

  def create
    @board = Board.new(board_params)
    @board.id = Board.last.id + 1
    @board.user_id = current_user.id
    if @board.save
      render "show"
    else
      render :json => { error: @board.errors.full_messages }, status: :unproccessable_entity
    end
  end

  def show
    @board = Board.includes(lists: { cards: { comments: :user } }).find(params[:id])
    # generate lists variable so we can show them on the board show page
    render "show"
  end

  def edit
    @board = Board.find(params[:id])
  end

  def update
    @board = Board.find(params[:id])
    @board.user_id = current_user.id
    if @board.update(board_params)
      render "show"
    else
      render :json => { error: @board.errors.full_messages }, status: :unproccessable_entity
    end
  end

  def destroy
    @board = Board.find(params[:id])
    @board.destroy
    render "show"
  end

  private
  def board_params
    params.require(:board).permit(:title)
  end
end

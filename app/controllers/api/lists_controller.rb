class Api::ListsController < ApplicationController
  def index
    @lists = List.includes({ cards: :comments }).all
    render "index"
  end 

  def create
    @list = List.new(list_params)
    # list.board_id = params[:id]
    @list.id = List.last.id + 1
    if @list.save
      render :json => @list
    else
      render :json => { error: @list.errors.full_messages }, status: :unproccessable_entity
    end
  end

  def update
    @list = List.includes(:cards).find(params[:id])
    if @list.update!(list_params)
      render "show"
    else
      render :json => { error: @list.errors.full_messages }, status: :unproccessable_entity
    end
  end

  def show
    @list = List.includes({ cards: :comments }).find(params[:id])
    render "show"
  end

  def destroy
    @list = List.find(params[:id])
    @list.destroy
    render "show"
  end

  private
  def list_params
    params.require(:list).permit(:board_id, :title, :ord)
  end
end

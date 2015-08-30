class Api::ListsController < ApplicationController
  def index
    @lists = List.all
    render "index"
  end 

  def create
    @list = List.new(list_params)
    # list.board_id = params[:id]
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
    @list = List.includes(:cards).find(params[:id])
    render "show"
  end

  def destroy
    @list = List.find(params[:id])
    @list.destroy()
    redirect_to api_boards_url
  end

  private
  def list_params
    params.require(:list).permit(:board_id, :title, :ord)
  end
end

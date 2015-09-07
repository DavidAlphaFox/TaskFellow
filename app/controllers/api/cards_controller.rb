class Api::CardsController < ApplicationController
  def index
    @cards = Card.all
    render "index"
  end

  def create
    @card = Card.new(card_params)
    @card.id = Card.last.id + 1
    if @card.save
      render "show"
    else
      render :json => { error: @card.errors.full_messages }, status: :unproccessable_entity
    end
  end

  def show
    @card = Card.find(params[:id])
    render "show"
  end

  def update
    @card = Card.find(params[:id])
    if @card.update(card_params)
      render "show"
    else
      render :json => { error: @card.errors.full_messages }, status: :unproccessable_entity
    end
  end

  def destroy
    @card = Card.find(params[:id])
    @card.destroy
    render "show"
  end

  private
  def card_params
    params.require(:card).permit(:list_id, :title, :description, :ord)
  end
end

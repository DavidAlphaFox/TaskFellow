class Api::CardsController < ApplicationController
  def create
    card = Card.new(card_params)
    # card.list_id = params[:id]
    if card.save
      render :json => card
    else
      render :json => { error: card.errors.full_messages }, status: :unproccessable_entity
    end
  end

  def update
    card = Card.find(params[:id])
    if card.update(list_params)
      render :json => card
    else
      render :json => { error: card.errors.full_messages }, status: :unproccessable_entity
    end
  end

  def destroy
    card = Card.find(params[:id])
    card.destroy()
    redirect_to api_boards_url
  end

  private
  def card_params
    params.require(:card).permit(:list_id, :title, :description, :ord)
  end
end

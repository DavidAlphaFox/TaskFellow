Rails.application.routes.draw do
  root to: "static_pages#index"

  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: { format: :json } do
    resources :boards, except: [:new, :edit]
    resources :lists, only: [:create, :update, :show, :destroy]
    resources :cards, only: [:create, :update, :show, :destroy]
  end
end

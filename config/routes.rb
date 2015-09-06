Rails.application.routes.draw do
  root to: "static_pages#index"

  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: { format: :json } do
    resources :boards, except: [:new, :edit]
    resources :lists, except: [:new, :edit]
    resources :cards, except: [:new, :edit]
    resources :users, except: [:new, :edit]
    resources :comments, except: [:new, :edit]
  end
end

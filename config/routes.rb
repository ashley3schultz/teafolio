Rails.application.routes.draw do
  resources :posts, only: [:index, :create, :update, :destroy] do
    resources :teas, only: [:show]
  end
  resources :pending_teas, only: [:index, :show, :create, :edit, :update, :destroy]

  resources :users, only: [:index, :show, :create] do
    resources :teas, only: [:index, :show]
  end

  resources :teas do
    resources :users, only: [:new, :index, :show, :destroy]
    resources :posts, only: [:edit]
  end

  get 'signup', to: 'users#new'
  get 'login',   to: 'sessions#new'
  post 'login',   to: 'sessions#create'
  get 'logout',  to: 'sessions#logout'
  root 'application#home'
end

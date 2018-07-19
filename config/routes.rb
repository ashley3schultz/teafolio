Rails.application.routes.draw do
  resources :posts, only: [:index, :create, :edit, :update, :destroy]
  resources :pending_teas, only: [:index, :show, :create, :edit, :update, :destroy]

  resources :users, only: [:index, :show, :create] do
    resources :teas, only: [:index, :show]
    resources :posts
  end

  resources :teas do
    resources :users, only: [:new, :index, :show, :destroy]
  end

  get 'signup', to: 'users#new'
  get 'login',   to: 'sessions#new'
  post 'login',   to: 'sessions#create'
  get 'logout',  to: 'sessions#logout'
  root 'application#home'
end

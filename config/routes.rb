Rails.application.routes.draw do
  resources :posts, only: [:create, :update, :destroy]
  resources :pending_teas, only: [:show, :create, :edit, :update, :destroy]
  resources :users, only: [:show, :create]
  resources :teas
  get 'signup', to: 'users#new'
  get 'login',   to: 'sessions#new'
  post 'login',   to: 'sessions#create'
  get 'logout',  to: 'sessions#logout'
  root 'application#home'
end

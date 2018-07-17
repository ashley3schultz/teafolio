Rails.application.routes.draw do
  resources :posts, only: [:index, :create, :update, :destroy]
  resources :pending_teas, only: [:index, :show, :create, :edit, :update, :destroy]
  resources :users, only: [:index, :show, :create]
  resources :teas
  get 'signup', to: 'users#new'
  get 'login',   to: 'sessions#new'
  post 'login',   to: 'sessions#create'
  get 'logout',  to: 'sessions#logout'
  root 'application#home'
end

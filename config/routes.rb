Rails.application.routes.draw do
  resources :posts, only: [:create, :update, :destroy]
  resources :pending_teas, only: [:show, :create, :edit, :update, :destroy]
  resources :users, only: [:show, :create]
  resources :teas
  get 'signup', to: 'users#signup'
  get 'login', to: 'users#login'
end

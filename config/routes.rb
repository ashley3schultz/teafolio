Rails.application.routes.draw do
  resources :posts
  resources :pending_teas
  resources :user_teas
  resources :users
  resources :teas
end

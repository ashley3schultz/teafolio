Rails.application.routes.draw do
  resources :posts
  resources :pending_teas
  resources :user_teas
  resources :users
  resources :teas
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end

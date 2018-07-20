Rails.application.routes.draw do
  resources :posts, only: [:index, :create, :update, :destroy] do
    #resources :teas, only: [:show]
  end
  resources :pending_teas, only: [:index, :show, :create, :edit, :update, :destroy]

  resources :users, only: [:index, :show, :create, :update] do
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
  get 'teas/:id/add',  to: 'teas#add'
  get 'teas/:id/remove',  to: 'teas#remove'
  root 'application#home'
  get '*path' => redirect('/')
end

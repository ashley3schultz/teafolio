Rails.application.routes.draw do

  resources :posts, only: [:index, :create, :update, :destroy, :show]
  resources :pending_teas, only: [:index, :show, :create, :edit, :update, :destroy]

  resources :users, only: [:index, :show, :create, :update] do
    resources :teas, only: [:index, :show]
  end

  get '/search/:id', to: 'teas#search'

  resources :teas do
    resources :users, only: [:new, :index, :show, :destroy]
    resources :posts, only: [:edit]
    get '/rate/:id', to: 'user_teas#rate'
    get '/rate', to: 'user_teas#rating'
    get '/owner', to: 'users#owner'

  end

  get 'signup', to: 'users#new'
  get 'login', to: 'sessions#new'
  post 'login', to: 'sessions#create'
  get 'logout', to: 'sessions#logout'
  get 'teas/:id/add', to: 'teas#add'
  get 'teas/:id/remove', to: 'teas#remove'
  get '/auth/facebook/callback', to: 'sessions#create'
  get '*path', to: redirect('/')
  root 'application#home'

end

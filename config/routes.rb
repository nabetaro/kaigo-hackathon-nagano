Rails.application.routes.draw do
  root :to => "events#index"
  get "sign_in" => "user_sessions#new"
  resources :users
  resources :user_sessions, only: [:new, :create]
  resources :events
end

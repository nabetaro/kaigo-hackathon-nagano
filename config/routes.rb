Rails.application.routes.draw do
  resources :user
  resources :user_sessions, only: [:new, :create]
  resources :events
end

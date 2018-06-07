Rails.application.routes.draw do
  resources :tracks
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api do
  namespace :v1 do
    resources :tracks, except: [:new, :edit]
  end
end
end

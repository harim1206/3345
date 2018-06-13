Rails.application.routes.draw do

  namespace :api do
    namespace :v1 do
      resources :tracks, except: [:new, :edit]
      resources :playlists

      get 'collection', to: 'tracks#collection'
    end
  end

end

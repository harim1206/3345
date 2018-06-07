Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :tracks, except: [:new, :edit]
    end
  end

end

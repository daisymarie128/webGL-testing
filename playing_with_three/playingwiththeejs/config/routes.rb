Rails.application.routes.draw do
  get 'three/index'

  root :to => 'three#index'
end

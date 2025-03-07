# Be sure to restart your server when you modify this file.

# Avoid CORS issues when API is called from the frontend app.
# Handle Cross-Origin Resource Sharing (CORS) in order to accept cross-origin Ajax requests.

# Read more: https://github.com/cyu/rack-cors

# Rails.application.config.middleware.insert_before 0, Rack::Cors do
#   allow do
#     origins "*"

#     resource "*",
#       headers: :any,
#       methods: [ :get, :post, :put, :patch, :delete, :options, :head ]
#   end
# end

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    # origins "*"
    origins "http://localhost:19006", "http://192.168.0.102:19006"
    resource "*", headers: :any, methods: [ :get, :post, :patch, :put, :delete, :options ]
  end
end

class Api::V1::AuthController < ApplicationController
  SECRET_KEY = Rails.application.credentials.secret_key_base

  def register
    user = User.new(user_params)

    if user.save
      token = encode_token(user.id)
      render json: { user: user, token: token }, status: :created
    else
      render json: { message: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def login
    user = User.find_by(email: params[:email])
    if user&.authenticate(params[:password])
      token = encode_token(user.id)
      render json: { user: user, token: token }, status: :ok
    else
      render json: { message: "Invalid email or password" }, status: :unauthorized
    end
  end

  private

  def user_params
    params.permit(:email, :password)
  end

  def encode_token(user_id)
    JWT.encode({ user_id: user_id }, SECRET_KEY, "HS256")
  end
end

class Api::V1::CategoriesController < ApplicationController
  def index
    categories = Category.includes(:subcategories).all
    render json: categories.as_json(include: :subcategories)
  end
end

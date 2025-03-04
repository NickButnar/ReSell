class Api::V1::PostsController < ApplicationController
  before_action :set_category_and_subcategory, only: [ :create ]

  # def index
  #   posts = Post.all
  #   render json: posts, status: :ok
  # end

  def index
    posts = Post.includes(:category).all
    render json: posts.as_json(include: { category: { only: [ :id, :title, :icon ] }, subcategory: { only: [ :id, :title ] } }), status: :ok
  end

  def create
    post = Post.new(post_params)
    post.category = @category
    post.subcategory = @subcategory

    if post.save
      render json: post, status: :created
    else
      render json: { errors: post.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def post_params
    params.require(:post).permit(:title, :description)
  end

  def set_category_and_subcategory
    @category = Category.find_by(title: params[:category_title])
    @subcategory = Subcategory.find_by(title: params[:subcategory_title])

    if @category.nil? || @subcategory.nil?
      render json: { error: "Category or Subcategory not found" }, status: :not_found
    end
  end
end

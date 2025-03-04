class Category < ApplicationRecord
  has_many :subcategories, dependent: :destroy
  has_many :posts, dependent: :destroy
end

class Subcategory < ApplicationRecord
  belongs_to :category
  has_many :posts, dependent: :destroy
end

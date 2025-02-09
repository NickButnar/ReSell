class User < ApplicationRecord
  has_secure_password # bcrypt support
  validates :email, presence: true, uniqueness: true
end

# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end


categories = [
  { title: 'Cars', icon: 'automobile', subcategories: [ 'Sedans', 'SUVs', 'Trucks' ] },
  { title: 'Electronics', icon: 'laptop', subcategories: [ 'Phones', 'Laptops', 'TVs' ] },
  { title: 'Home & Garden', icon: 'home', subcategories: [ 'Furniture', 'Decor', 'Appliances' ] },
  { title: 'Sports', icon: 'dribbble', subcategories: [ 'Fitness', 'Outdoor', 'Cycling' ] },
  { title: 'Health', icon: 'heartbeat', subcategories: [ 'Pharmacy', 'Medical Devices', 'Wellness' ] },
  { title: 'Children', icon: 'child', subcategories: [ 'Toys', 'Clothing', 'School Supplies' ] }
]

categories.each do |category_data|
  category = Category.create!(title: category_data[:title], icon: category_data[:icon])
  category_data[:subcategories].each do |sub_title|
    category.subcategories.create!(title: sub_title)
  end
end

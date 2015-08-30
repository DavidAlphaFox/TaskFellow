# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.create!(username: "edhuang", password: "password");

5.times do
  Board.create!(user_id: 1, title: Faker::Internet.user_name)
end

counter = 1
2.times do
  List.create!(board_id: 1, title: Faker::Lorem.words(4).join(" "), ord: counter)
  List.create!(board_id: 2, title: Faker::Lorem.words(4).join(" "), ord: counter)
  List.create!(board_id: 3, title: Faker::Lorem.words(4).join(" "), ord: counter)
  List.create!(board_id: 4, title: Faker::Lorem.words(4).join(" "), ord: counter)
  List.create!(board_id: 5, title: Faker::Lorem.words(4).join(" "), ord: counter)
  counter += 1
end

card_counter = 1
5.times do
  Card.create!(list_id: 1, description: Faker::Lorem.words(4).join(" "), ord: card_counter)
  Card.create!(list_id: 2, description: Faker::Lorem.words(4).join(" "), ord: card_counter)
  Card.create!(list_id: 3, description: Faker::Lorem.words(4).join(" "), ord: card_counter)
  Card.create!(list_id: 4, description: Faker::Lorem.words(4).join(" "), ord: card_counter)
  Card.create!(list_id: 5, description: Faker::Lorem.words(4).join(" "), ord: card_counter)
  Card.create!(list_id: 6, description: Faker::Lorem.words(4).join(" "), ord: card_counter)
  Card.create!(list_id: 7, description: Faker::Lorem.words(4).join(" "), ord: card_counter)
  Card.create!(list_id: 8, description: Faker::Lorem.words(4).join(" "), ord: card_counter)
  Card.create!(list_id: 9, description: Faker::Lorem.words(4).join(" "), ord: card_counter)
  Card.create!(list_id: 10, description: Faker::Lorem.words(4).join(" "), ord: card_counter)
  counter += 1
end
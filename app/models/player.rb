class Player < ActiveRecord::Base
  # Remember to create a migration!
  has_many :races
  has_many :games, :through => :races
end

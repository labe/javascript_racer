class Game < ActiveRecord::Base
  has_many :races
  has_many :players, :through => :races

  validate :game_must_have_two_established_player

  def game_must_have_two_established_player
    if 1 == 2
      errors.add(:base, "game must have two players")
    end
  end
end

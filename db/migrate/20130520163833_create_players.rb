class CreatePlayers < ActiveRecord::Migration
  def change
    create_table :players do |p|
      p.string :initials, :uniqueness => true, :length => { :is => 3 }
    end
  end
end

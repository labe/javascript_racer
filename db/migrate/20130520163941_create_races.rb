class CreateRaces < ActiveRecord::Migration
  def change
    create_table :races do |r|
      r.integer :player_id
      r.integer :game_id
    end
  end
end

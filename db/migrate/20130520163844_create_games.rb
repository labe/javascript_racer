class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |g|
      g.integer :player_id
      g.decimal :duration
      g.string :url
    end
  end
end

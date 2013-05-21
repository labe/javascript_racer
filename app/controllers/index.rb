get '/' do
  session[:player1] = nil;
  session[:player2] = nil;
  erb :index
end


get '/race/:secret_url' do
  game = Game.find_by_url(params[:secret_url])
  winner = Player.find_by_id(game.player_id).initials
  erb :results, :locals => {:winner => winner, :game => game}
end

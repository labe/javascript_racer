get '/game' do
  if (!session[:player1] || !session[:player2]) || session[:player1] == session[:player2]
    erb :error
  else
    erb :game
  end
end

post '/replay_game' do
  session[:player1] = params[:player1]
  session[:player2] = params[:player2]
  redirect to '/game'
end

post '/game' do
  player1 = session[:player1]
  player2 = session[:player2]
  if params[:winner] == "Player 1"
    winner = player1
  elsif params[:winner] == "Player 2"
    winner = player2
  end
  duration = params[:duration]
  url = rand(36**6).to_s(36)
  game = Game.new(:player_id => winner, :duration => duration, :url => url)
  Player.find(player1).games << game
  Player.find(player2).games << game
  game.save
  redirect to "/game/#{game.id}/results"
end

get '/game/:id/results' do
  game = Game.find(params[:id])
  winner = Player.find_by_id(game.player_id).initials
  erb :replay, :locals => {:winner => winner, :game => game}
end
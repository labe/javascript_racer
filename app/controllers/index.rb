get '/' do
  session[:player1] = nil;
  session[:player2] = nil;
  redirect to '/player1'
end

get '/player1' do
  player_number = 1
  erb :player, :locals => {:player_number => player_number}
end

post '/player1' do
  initials = params[:player1]
  initials = initials.upcase
  player1 = Player.find_or_create_by_initials(initials)
  session[:player1] = player1.id
  redirect to '/player2'
end

get '/player2' do
  player_number = 2
  erb :player, :locals => {:player_number => player_number}
end

post '/player2' do
  initials = params[:player2]
  initials = initials.upcase
  player2 = Player.find_or_create_by_initials(initials)
  session[:player2] = player2.id
  redirect to '/game'
end

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

get '/race/:secret_url' do
  game = Game.find_by_url(params[:secret_url])
  winner = Player.find_by_id(game.player_id).initials
  erb :results, :locals => {:winner => winner, :duration => game.duration, :url => game.url}
end

get '/game/:id/results' do
  game = Game.find(params[:id])
  winner = Player.find_by_id(game.player_id).initials
  erb :replay, :locals => {:winner => winner, :game => game}
end

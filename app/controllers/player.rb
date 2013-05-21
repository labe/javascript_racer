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
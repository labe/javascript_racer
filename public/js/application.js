board = {
  move: function(key) {
    if (key == 80) {
      board.player_1_pos += 1;
    } else if (key == 81) {
      board.player_2_pos += 1;
    }
    board.print();
    board.displayWinner();
  },
  print: function() {
    $('#player1_strip td').removeClass("active");
    $('#player1_strip td:nth-child(' + board.player_1_pos + ')').addClass("active");
    $('#player2_strip td').removeClass("active");
    $('#player2_strip td:nth-child(' + board.player_2_pos + ')').addClass("active");
  },
  finished: function() {
    return board.winner() != undefined;
  },

  winner: function() {
    var board_length = $("#player1_strip td").length;
    if (board.player_1_pos >= board_length) {
      return 'Player 1';
    } else if (board.player_2_pos >= board_length) {
      return 'Player 2';
    } else {
      return undefined;
    }
  },
  displayWinner: function() {
    if(board.finished()) {
      board.duration = (new Date).getTime() - board.start_time;
      alert(board.winner() + ' has won in ' + board.duration/1000 + ' seconds!');
    }
  },
  reset: function() {
    board.player_1_pos = 1;
    board.player_2_pos = 1;
    board.start_time = undefined;
    board.print();
  },

  submit: function() {
    $('#results input[name=winner]').val(board.winner());
    $('#results input[name=duration]').val(board.duration/1000);
    $('#results').submit();
  }
}


$(document).ready(function() {
  board.reset();
  $(document).one('keydown', function(e) {
    board.start_time = e.timeStamp;
  });
  $(document).on('keyup', function(e) {
    if(! board.finished()) {
      board.move(e.which);
    } else {
      board.submit();
    }
  });
  $('button#reset').click(function () {
    alert(board.winner + ", " + board.duration/1000);
  });
});

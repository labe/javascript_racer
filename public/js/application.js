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
    $('#race_results input[name=winner]').val(board.winner());
    $('#race_results input[name=duration]').val(board.duration/1000);
    $('#race_results').submit();
  }
}


// $(document).ready(function() {
//   board.reset();
//   $(document).one('keydown', function(e) {
//     board.start_time = e.timeStamp;
//   });
//   $(document).on('keyup', function(e) {
//     if(! board.finished()) {
//       board.move(e.which);
//     } else {
//       board.submit();
//     }
//   });
//   $('button#reset').click(function () {
//     alert(board.winner + ", " + board.duration/1000);
//   });
// });

$(document).ready(function() {
  $('#error h3').mouseover(function() {
    $(this).css("background-color", "#33CC00");
  });
  $('#error h3').mouseout(function() {
    $(this).css("background-color", "green");
  });
});

$(document).ready(function() {
  $('.blink').each(function() {
    var elem = $(this);
    setInterval(function() {
        if (elem.css('visibility') == 'hidden') {
            elem.css('visibility', 'visible');
        } else {
            elem.css('visibility', 'hidden');
        }    
    }, 500);
  });
});

$(document).ready(function() {
  if (window.location.pathname == '/') {
    setInterval(function() {
      $('.ruby').next('span').addClass('ruby');   
    }, 500);
    window.setTimeout(function() {
      window.location.href = '/player1';
    }, 5500);
  }
});

$(document).ready(function() {
  setTimeout(function() {
    var racer = $('.racer');
    setInterval(function() {
       racer.toggleClass('racer-red');
    }, 500);
  }, 1500);

  setTimeout(function() {
    $('#welcome h1').text("");
  }, 4500);
});

$(document).ready(function() {
  setTimeout(function() {
    $('#countdown').css("background-color", "yellow");
    $('#countdown h1').text("STEADY??");
  }, 2000);
  setTimeout(function() {
    $('#countdown').css("background-color", "green");
    $('#countdown h1').text("RACE!");
  }, 4000);

  setTimeout(function() {
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
  }, 4000);
});

$(document).ready(function() {
  $('.play_again input[type="submit"]').mouseover(function() {
    $(this).css("background-color", "#DDDDDD");
  });
  $('.play_again input[type="submit"]').mouseout(function() {
    $(this).css("background-color", "");
  });
});
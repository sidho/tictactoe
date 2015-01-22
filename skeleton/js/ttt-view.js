(function () {
  if (typeof TTT === "undefined") {
    window.TTT = {};
  }

  var View = TTT.View = function (game, $el) {
    this.game = game;
    this.main = $el;
    this.setupBoard();
    this.bindEvents();
  };

  View.prototype.bindEvents = function () {
    var that = this;
    this.main.on("click", ".tile", function (event) {
      var $square = $(event.currentTarget);
      var pos = $square.data('pos');

      // if (!that.game.board.isEmptyPos(pos)) {
      //   var $message = $('<div class= "message">');
      //   $message.text("Invalid move!");
      //   this.main.append($message);
      // }
      
      console.log(pos);
      that.game.playMove(pos);
      console.log(that.game);
      that.makeMove($square);

      if (that.game.isOver()) {
        var $winner = that.game.winner();
        var $message = $('<div class= "message">');
        $message.text($winner + " is the winner!");
        that.main.append($message);
        that.main.off("click");
      }
    })
  };

  View.prototype.makeMove = function ($square) {
    $square.removeClass("tile");
    $square.addClass("playedTile");
    pos = $square.data('pos');

    if (this.game.board.grid[pos[0]][pos[1]] === 'x'){
      var $span = $('<span class="x">✗</span>');
      $square.append($span);
    } else {
      var $span = $('<span class="o">ට</span>');
      $square.append($span);
    }
  };

  View.prototype.setupBoard = function () {
    for(var i = 0; i < 3; i++) {
      var $row = $('<div class="row">');
      this.main.append($row);
      for(var j = 0; j < 3; j++){
        var $div = $('<div class="tile">');
        $div.data("pos", [i, j]);
        $row.append($div);
      }
    }
  };

})();

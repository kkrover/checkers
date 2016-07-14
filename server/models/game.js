import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const gameSchema = new Schema({
  board: [],
  redPlayer: { type: mongoose.Schema.ObjectId, ref: 'Player' },
  blackPlayer: { type: mongoose.Schema.ObjectId, ref: 'Player' },
});

gameSchema.methods.newGame = function (redPlayerId, blackPlayerId, cb) {
  this.board = [[null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null]];
  this.redPlayer = redPlayerId;
  this.blackPlayer = blackPlayerId;

  const pieces = {red:  [[0,0],[0,2],[0,4],[0,6],
                      [1,1],[1,3],[1,5],[1,7],
                      [2,0],[2,2],[2,4],[2,6]],
              black: [[5,1],[5,3],[5,5],[5,7],
                      [6,0],[6,2],[6,4],[6,6],
                      [7,1],[7,3],[7,5],[7,7]]
              };

  // places a player (either 'R' or 'B') at a particular row and column on the board
function setSquare(board, playerId, row, col) {
    board[row][col] = playerId;
    return board;
  }

  function setUpBlack(board, blackPlayer) {
    for (var i = 0; i < pieces.black.length; i++) {
      setSquare(board, blackPlayer, pieces.black[i][0], pieces.black[i][1]);
    }
  }

  function setUpRed(board, redPlayer) {
    for (var i = 0; i < pieces.red.length; i++) {
      setSquare(board, redPlayer, pieces.red[i][0], pieces.red[i][1]);
    }
  }

  setUpRed(this.board, this.redPlayer);
  setUpBlack(this.board, this.blackPlayer);
  return cb();
};

module.exports = mongoose.model('Game', gameSchema);

/* eslint-disable no-use-before-define, func-names, no-param-reassign, max-len */
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const gameSchema = new Schema({
  board: [],
  redPlayer: { type: mongoose.Schema.ObjectId, ref: 'Player' },
  blackPlayer: { type: mongoose.Schema.ObjectId, ref: 'Player' },
});

function setSquare(board, playerId, row, col) {
  board[row][col] = playerId;
  return board;
}

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

  const pieces = { red: [[0, 0], [0, 2], [0, 4], [0, 6],
                      [1, 1], [1, 3], [1, 5], [1, 7],
                      [2, 0], [2, 2], [2, 4], [2, 6]],
              black: [[5, 1], [5, 3], [5, 5], [5, 7],
                      [6, 0], [6, 2], [6, 4], [6, 6],
                      [7, 1], [7, 3], [7, 5], [7, 7]],
              };

  // places a player (either 'R' or 'B') at a particular row and column on the board
  function setUpBlack(board, blackPlayer) {
    for (let i = 0; i < pieces.black.length; i++) {
      setSquare(board, blackPlayer, pieces.black[i][0], pieces.black[i][1]);
    }
  }

  function setUpRed(board, redPlayer) {
    for (let i = 0; i < pieces.red.length; i++) {
      setSquare(board, redPlayer, pieces.red[i][0], pieces.red[i][1]);
    }
  }

  setUpRed(this.board, this.redPlayer);
  setUpBlack(this.board, this.blackPlayer);
  return cb();
};

// returns the piece at a particular row and column; or null
function getPieceAt(board, row, col) {
  return board[row][col];
}

function isValidRedMove(from, to) {
  return ((to.x === (from.x + 1)) && (from.x < 7)) && (((to.y === (from.y + 1)) && (from.y < 7)) || ((to.y === (from.y - 1) && from.y > 0)));
}

function isValidBlackMove(from, to) {
  return ((to.x === (from.x - 1)) && (from.x > 0)) && (((to.y === (from.y + 1)) && (from.y < 7)) || ((to.y === (from.y - 1)) && (from.y > 0)));
}

gameSchema.methods.move = function (from, playerId, to, cb) {
  const fromPiece = getPieceAt(this.board, from.x, from.y);
  const toPiece = getPieceAt(this.board, to.x, to.y);

  if (fromPiece === null) {
    return cb(new Error('no piece at from location'));
  } else if (fromPiece.toString() !== playerId.toString()) {
    return cb(new Error('piece does not belong to player'));
  } else if (toPiece !== null && toPiece !== undefined) {
    return cb(new Error('destination square already contains piece'));
  } else if (playerId.toString() === this.redPlayer.toString()) {
    if (!isValidRedMove(from, to)) {
      return cb(new Error('invalid move'));
    }
    setSquare(this.board, playerId, to.x, to.y);
    setSquare(this.board, null, from.x, from.y);
    return cb();
  } else if (playerId.toString() === this.blackPlayer.toString()) {
    if (!isValidBlackMove(from, to)) {
      return cb(new Error('invalid move'));
    }

    setSquare(this.board, playerId, to.x, to.y);
    setSquare(this.board, null, from.x, from.y);
    return cb();
  }
  return cb();
};

module.exports = mongoose.model('Game', gameSchema);

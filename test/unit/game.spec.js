/* eslint-disable no-unused-expressions, no-underscore-dangle, max-len */

const expect = require('chai').expect;
const Game = require('../../dst/models/game');
const Player = require('../../dst/models/player');
// const app = require('../../dst/server');
// const cp = require('child_process');

describe('game', () => {
  describe('constructor', () => {
    it('should create a new game', (done) => {
      const d = new Game();
      d.validate(err => {
        expect(err).to.be.undefined;
        expect(d.board.length).to.equal(0);
        expect(d.board.redPlayer).to.be.undefined;
        expect(d.board.blackPlayer).to.be.undefined;
        done();
      });
    });
  });
  describe('#newGame', () => {
    it('should set up a new game', (done) => {
      const redPlayer = new Player({ name: 'red' });
      const blackPlayer = new Player({ name: 'black' });
      const d = new Game();
      d.newGame(redPlayer._id, blackPlayer._id, () => {
        expect(d.board.length).to.equal(8);
        expect(d.redPlayer).to.equal(redPlayer._id);
        expect(d.blackPlayer).to.equal(blackPlayer._id);
        expect(d.board[0][0].toString()).to.equal(redPlayer._id.toString());
        expect(d.board[0][2].toString()).to.equal(redPlayer._id.toString());
        expect(d.board[0][4].toString()).to.equal(redPlayer._id.toString());
        expect(d.board[0][6].toString()).to.equal(redPlayer._id.toString());
        expect(d.board[1][1].toString()).to.equal(redPlayer._id.toString());
        expect(d.board[1][3].toString()).to.equal(redPlayer._id.toString());
        expect(d.board[1][5].toString()).to.equal(redPlayer._id.toString());
        expect(d.board[1][7].toString()).to.equal(redPlayer._id.toString());
        expect(d.board[2][0].toString()).to.equal(redPlayer._id.toString());
        expect(d.board[2][2].toString()).to.equal(redPlayer._id.toString());
        expect(d.board[2][4].toString()).to.equal(redPlayer._id.toString());
        expect(d.board[2][6].toString()).to.equal(redPlayer._id.toString());
        expect(d.board[5][1].toString()).to.equal(blackPlayer._id.toString());
        expect(d.board[5][3].toString()).to.equal(blackPlayer._id.toString());
        expect(d.board[5][5].toString()).to.equal(blackPlayer._id.toString());
        expect(d.board[5][7].toString()).to.equal(blackPlayer._id.toString());
        expect(d.board[6][0].toString()).to.equal(blackPlayer._id.toString());
        expect(d.board[6][2].toString()).to.equal(blackPlayer._id.toString());
        expect(d.board[6][4].toString()).to.equal(blackPlayer._id.toString());
        expect(d.board[6][6].toString()).to.equal(blackPlayer._id.toString());
        expect(d.board[7][1].toString()).to.equal(blackPlayer._id.toString());
        expect(d.board[7][3].toString()).to.equal(blackPlayer._id.toString());
        expect(d.board[7][5].toString()).to.equal(blackPlayer._id.toString());
        expect(d.board[7][7].toString()).to.equal(blackPlayer._id.toString());
        done();
      });
    });
  });
});

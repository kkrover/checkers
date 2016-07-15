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
    describe('#move', () => {
      it('should allow move - red piece', (done) => {
        const redPlayer = new Player({ name: 'red' });
        const blackPlayer = new Player({ name: 'black' });
        const d = new Game();
        d.newGame(redPlayer._id, blackPlayer._id, () => {});
        d.move({ x: 2, y: 6 }, redPlayer.id, { x: 3, y: 5 }, (err) => {
          expect(err).to.be.undefined;
          expect(d.board[3][5].toString()).to.equal(redPlayer._id.toString());
          expect(d.board[2][6]).to.be.null;
          done();
        });
      });
      it('should allow move - black piece', (done) => {
        const redPlayer = new Player({ name: 'red' });
        const blackPlayer = new Player({ name: 'black' });
        const d = new Game();
        d.newGame(redPlayer._id, blackPlayer._id, () => {});
        d.move({ x: 5, y: 3 }, blackPlayer.id, { x: 4, y: 4 }, (err) => {
          expect(err).to.be.undefined;
          expect(d.board[4][4].toString()).to.equal(blackPlayer._id.toString());
          expect(d.board[5][3]).to.be.null;
          done();
        });
      });
      it('should not allow move - no from piece', (done) => {
        const redPlayer = new Player({ name: 'red' });
        const blackPlayer = new Player({ name: 'black' });
        const d = new Game();
        d.newGame(redPlayer._id, blackPlayer._id, () => {});
        d.move({ x: 0, y: 1 }, redPlayer.id, { x: 1, y: 1 }, (err) => {
          expect(err.message).to.equal('no piece at from location');
          done();
        });
      });
      it('should not allow move - not players piece from piece', (done) => {
        const redPlayer = new Player({ name: 'red' });
        const blackPlayer = new Player({ name: 'black' });
        const d = new Game();
        d.newGame(redPlayer._id, blackPlayer._id, () => {});
        d.move({ x: 0, y: 0 }, blackPlayer.id, { x: 1, y: 1 }, (err) => {
          expect(err.message).to.equal('piece does not belong to player');
          done();
        });
      });
      it('should not allow move - piece exists in to location', (done) => {
        const redPlayer = new Player({ name: 'red' });
        const blackPlayer = new Player({ name: 'black' });
        const d = new Game();
        d.newGame(redPlayer._id, blackPlayer._id, () => {});
        d.move({ x: 0, y: 0 }, redPlayer.id, { x: 1, y: 1 }, (err) => {
          expect(err.message).to.equal('destination square already contains piece');
          done();
        });
      });
      it('should not allow move - invalid red move x', (done) => {
        const redPlayer = new Player({ name: 'red' });
        const blackPlayer = new Player({ name: 'black' });
        const d = new Game();
        d.newGame(redPlayer._id, blackPlayer._id, () => {});
        d.move({ x: 1, y: 3 }, redPlayer.id, { x: 3, y: 1 }, (err) => {
          expect(err.message).to.equal('invalid move');
          done();
        });
      });
      it('should not allow move - invalid red move y', (done) => {
        const redPlayer = new Player({ name: 'red' });
        const blackPlayer = new Player({ name: 'black' });
        const d = new Game();
        d.newGame(redPlayer._id, blackPlayer._id, () => {});
        d.move({ x: 1, y: 3 }, redPlayer.id, { x: 2, y: 5 }, (err) => {
          expect(err.message).to.equal('invalid move');
          done();
        });
      });
      it('should not allow move - invalid red move y', (done) => {
        const redPlayer = new Player({ name: 'red' });
        const blackPlayer = new Player({ name: 'black' });
        const d = new Game();
        d.newGame(redPlayer._id, blackPlayer._id, () => {});
        d.move({ x: 1, y: 3 }, redPlayer.id, { x: 2, y: 3 }, (err) => {
          expect(err.message).to.equal('invalid move');
          done();
        });
      });
      it('should not allow move - invalid red move corner', (done) => {
        const redPlayer = new Player({ name: 'red' });
        const blackPlayer = new Player({ name: 'black' });
        const d = new Game();
        d.newGame(redPlayer._id, blackPlayer._id, () => {});
        d.move({ x: 0, y: 0 }, redPlayer.id, { x: 0, y: 8 }, (err) => {
          expect(err.message).to.equal('invalid move');
          done();
        });
      });
      it('should not allow move - invalid black move x', (done) => {
        const redPlayer = new Player({ name: 'red' });
        const blackPlayer = new Player({ name: 'black' });
        const d = new Game();
        d.newGame(redPlayer._id, blackPlayer._id, () => {});
        d.move({ x: 7, y: 1 }, blackPlayer.id, { x: 5, y: 2 }, (err) => {
          expect(err.message).to.equal('invalid move');
          done();
        });
      });
      it('should not allow move - invalid black move y', (done) => {
        const redPlayer = new Player({ name: 'red' });
        const blackPlayer = new Player({ name: 'black' });
        const d = new Game();
        d.newGame(redPlayer._id, blackPlayer._id, () => {});
        d.move({ x: 7, y: 1 }, blackPlayer.id, { x: 6, y: 1 }, (err) => {
          expect(err.message).to.equal('invalid move');
          done();
        });
      });
      it('should not allow move - invalid black move y', (done) => {
        const redPlayer = new Player({ name: 'red' });
        const blackPlayer = new Player({ name: 'black' });
        const d = new Game();
        d.newGame(redPlayer._id, blackPlayer._id, () => {});
        d.move({ x: 6, y: 2 }, blackPlayer.id, { x: 5, y: 0 }, (err) => {
          expect(err.message).to.equal('invalid move');
          done();
        });
      });
    });
  });
});
//     describe('#jump', () => {
//       it('should allow jump - red piece', (done) => {
//         const redPlayer = new Player({ name: 'red' });
//         const blackPlayer = new Player({ name: 'black' });
//         const d = new Game();
//         d.newGame(redPlayer._id, blackPlayer._id, () => {});
//         d.move({ x: 5, y: 3 }, blackPlayer.id, { x: 6, y: 4 }, () => {});
//       });
//     });
//   });
// });

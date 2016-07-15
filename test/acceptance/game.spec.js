/* eslint-disable no-unused-expressions, no-underscore-dangle, max-len */

const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../dst/server');
const cp = require('child_process');
const Game = require('../../dst/models/game');

describe('games', () => {
  beforeEach((done) => {
    cp.execFile(`${__dirname}/../scripts/populateGames.sh`, { cwd: `${__dirname}/../scripts` }, () => {
      done();
    });
  });

  describe('post /games', () => {
    it('should create a game', (done) => {
      request(app)
      .post('/games')
      .send({ redPlayer: '5787a9b4cc4917adfb8b7e55',
        blackPlayer: '5787a9b4dfe917adfb8b7e55' })
      .end((err, rsp) => {
        expect(err).to.be.null;
        expect(rsp.status).to.equal(200);
        expect(rsp.body.board).to.be.ok;
        expect(rsp.body.gameId).to.be.ok;
        done();
      });
    });
    it('should Note create a game---validate', (done) => {
      request(app)
      .post('/games')
      .send({})
      .end((err, rsp) => {
        expect(err).to.be.null;
        expect(rsp.status).to.equal(400);
        expect(rsp.body.messages).to.deep.equal(['"redPlayer" is required']);
        done();
      });
    });
    it('should not create a game, black player missing', (done) => {
      request(app)
      .post('/games')
      .send({ redPlayer: '5787a9b4cc4917adfb8b7e5b' })
      .end((err, rsp) => {
        expect(err).to.be.null;
        expect(rsp.status).to.equal(400);
        expect(rsp.body.messages).to.deep.equal(['"blackPlayer" is required']);
        done();
      });
    });

    it('should not create a game, red player missing', (done) => {
      request(app)
      .post('/games')
      .send({ blackPlayer: '5787a9b4cc4917adfb8b7e5b' })
      .end((err, rsp) => {
        expect(err).to.be.null;
        expect(rsp.status).to.equal(400);
        expect(rsp.body.messages).to.deep.equal(['"redPlayer" is required']);
        done();
      });
    });

    it('should not create a game, both players are same', (done) => {
      request(app)
      .post('/games')
      .send({ blackPlayer: '5787a9b4cc4917adfb8b7e5b', redPlayer: '5787a9b4cc4917adfb8b7e5b' })
      .end((err, rsp) => {
        expect(err).to.be.null;
        expect(rsp.status).to.equal(400);
        expect(rsp.body.messages).to.equal('Both players ids are same');
        done();
      });
    });

    it('should not create a game, red player not found', (done) => {
      request(app)
      .post('/games')
      .send({ blackPlayer: '5787a9b4dfe917adfb8b7e55', redPlayer: '5787a9b4cc4917adfb8ddddd' })
      .end((err, rsp) => {
        expect(err).to.be.null;
        expect(rsp.status).to.equal(400);
        expect(rsp.body.messages).to.equal('red player not found');
        done();
      });
    });

    it('should not create a game, red player not found', (done) => {
      request(app)
      .post('/games')
      .send({ redPlayer: '5787a9b4cc4917adfb8b7e55', blackPlayer: '5787a9b4cc4917adfb8ddddd' })
      .end((err, rsp) => {
        expect(err).to.be.null;
        expect(rsp.status).to.equal(400);
        expect(rsp.body.messages).to.equal('black player not found');
        done();
      });
    });
  });
  describe('put /games/:id/move', () => {
    it('should move a red player piece', (done) => {
      request(app)
      .put('/games/01234567890123456789abcd/move')
      .send({ playerId: '5787f691b92e2aa9449268bc', from: { x: 2, y: 2 }, to: { x: 3, y: 3 } })
      .end((err, rsp) => {
        expect(err).to.be.null;
        expect(rsp.status).to.equal(200);
        expect(rsp.body.messages).to.be.undefined;
        expect(rsp.body.board[2][2]).to.be.null;
        expect(rsp.body.board[3][3].toString()).to.equal('5787f691b92e2aa9449268bc');
        done();
      });
    });
    it('should move a black player piece', (done) => {
      request(app)
      .put('/games/01234567890123456789abcd/move')
      .send({ playerId: '5787f691b92e2aa9449268bd', from: { x: 5, y: 3 }, to: { x: 4, y: 4 } })
      .end((err, rsp) => {
        expect(err).to.be.null;
        expect(rsp.status).to.equal(200);
        expect(rsp.body.messages).to.be.undefined;
        expect(rsp.body.board[5][3]).to.be.null;
        expect(rsp.body.board[4][4].toString()).to.equal('5787f691b92e2aa9449268bd');
        done();
      });
    });
  });
});

/* eslint-disable no-unused-expressions, no-underscore-dangle, max-len */

const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../dst/server');
const cp = require('child_process');
const Game = require('../../dst/models/game');

describe('games', () => {
  beforeEach((done) => {
    cp.execFile(`${__dirname}/../scripts/populatePlayers.sh`, { cwd:  `${__dirname}/../scripts` }, () => {
        done();
    });
  });

  describe('post /games', () => {
    it('should create a game', (done) => {
      request(app)
      .post('/games')
      .send({redPlayer: '5787a9b4cc4917adfb8b7e55',
        blackPlayer: '5787a9b4dfe917adfb8b7e55' })
      .end((err, rsp) => {
        expect(err).to.be.null;
        expect(rsp.status).to.equal(200);
        expect(rsp.body.board).to.be.ok;
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
      .send({redPlayer: '5787a9b4cc4917adfb8b7e5b'})
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
      .send({blackPlayer: '5787a9b4cc4917adfb8b7e5b'})
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
      .send({blackPlayer: '5787a9b4cc4917adfb8b7e5b', redPlayer: '5787a9b4cc4917adfb8b7e5b'})
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
      .send({blackPlayer: '5787a9b4dfe917adfb8b7e55', redPlayer: '5787a9b4cc4917adfb8ddddd'})
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
      .send({redPlayer: '5787a9b4cc4917adfb8b7e55', blackPlayer: '5787a9b4cc4917adfb8ddddd'})
      .end((err, rsp) => {
        expect(err).to.be.null;
        expect(rsp.status).to.equal(400);
        expect(rsp.body.messages).to.equal('black player not found');
        done();
      });
    });

  });
  describe('post /games/:id/move', () => {
    
  });
});

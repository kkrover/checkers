/* eslint-disable no-unused-expressions, no-underscore-dangle, max-len */

const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../dst/server');
const cp = require('child_process');
const Player = require('../../dst/models/player');

describe('players', () => {
  beforeEach((done) => {
     cp.execFile(`${__dirname}/../scripts/populatePlayers.sh`, { cwd: `${__dirname}/../scripts` }, () => {
       done();
     });
  });

  describe('Post /players', () => {
    it('should add a player', (done) => {
      request(app)
      .post('/players')
      .send({ name: 'player1' })
      .end((err, rsp) => {
        expect(err).to.be.null;
        expect(rsp.status).to.equal(200);
        expect(rsp.body.player.__v).to.not.be.null;
        expect(rsp.body.player._id).to.not.be.null;
        expect(rsp.body.player.name).to.equal('player1');
        done();
      });
    });
    it('should NOT add a player - validation: name missing', (done) => {
      request(app)
      .post('/players')
      .send({ })
      .end((err, rsp) => {
        expect(err).to.be.null;
        expect(rsp.status).to.equal(400);
        expect(rsp.body.messages).to.deep.equal(['"name" is required']);
        done();
      });
    });
  });
});

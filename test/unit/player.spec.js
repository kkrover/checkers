/* eslint-disable no-unused-expressions, no-underscore-dangle, max-len */

const expect = require('chai').expect;
const Player = require('../../dst/models/player');
// const app = require('../../dst/server');
// const cp = require('child_process');

describe('player', () => {
  describe('constructor', () => {
    it('should create a valid player', (done) => {
      const d = new Player({ name: 'Rich' });
      d.validate(err => {
        expect(err).to.be.undefined;
        expect(d.name).to.equal('Rich');
        expect(d._id).to.be.ok;
        expect(d.dateCreated).to.be.ok;
        done();
      });
    });
    it('should NOT create player - invalid name', (done) => {
      const d = new Player({ name: 'R' });
      d.validate(err => {
        expect(err).to.be.ok;
        done();
      });
    });
  });
});

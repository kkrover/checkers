/* eslint-disable new-cap */

import express from 'express';
import Player from '../models/player';
import playerBodyValidator from '../validators/players/body';
const router = module.exports = express.Router();

// index
router.post('/', playerBodyValidator, (req, res) => {
  const player = new Player(res.locals);
  player.save(res.locals, (err, player) => {
    if (player) {
      res.send({ player });
    } else {
      res.status(400).send({ err });
    }
  });
});

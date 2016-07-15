/* eslint-disable no-unused-expressions, no-underscore-dangle, max-len, new-cap */
import express from 'express';
import Game from '../models/game';
import Player from '../models/player';
import newGameValidator from '../validators/games/newGameValidator';
import moveValidator from '../validators/games/moveValidator';
// import playerBodyValidator from '../validators/players/body';
const router = module.exports = express.Router();

// index
router.get('/', (req, res) => {
  Game.createGame().exec((err, game) => {
    res.send({ game });
  });
});

router.post('/', newGameValidator, (req, res) => {
  const redPlayerId = res.locals.redPlayer;
  const blackPlayerId = res.locals.blackPlayer;
  if (redPlayerId === blackPlayerId) { // both player id are same value
    res.status(400).send({ messages: 'Both players ids are same' });
  } else {
    Player.findById(redPlayerId, (err, redPlayer) => {
      if (!redPlayer) {
        res.status(400).send({ messages: 'red player not found' });
      } else {
        Player.findById(blackPlayerId, (err2, blackPlayer) => {
          if (!blackPlayer) {
            res.status(400).send({ messages: 'black player not found' });
          } else {
            const g = new Game();
            g.newGame(redPlayerId, blackPlayerId, () => {
              g.save(() => {
                res.send({ gameId: g._id, board: g.board });
              });
            });
          }
        });
      }
    });
  }
});

router.put('/:id/move', moveValidator, (req, res) => {
  Game.findById(req.params.id, (error, game) => {
    if (!game) {
      res.status(400).send({ messages: 'game not found' });
    }

    game.move(res.locals.from, res.locals.playerId, res.locals.to, (err2) => {
      if (err2) {
        res.status(400).send({ error });
      }
      game.save(() => {
        res.send({ board: game.board });
      });
    });
  });
});

const router = require('express').Router();
const gamesController = require('../controllers/games.controllers');
const publisherController = require('../controllers/publisher.controler')

router.route("/games/:gameId/publisher")
    .get(publisherController.getOne);

router.route("/games/:gameId")
    .get(gamesController.getOne)
    .delete(gamesController.deleteOne);

router.route("/games")
    .get(gamesController.getAll)
    .post(gamesController.addOne);


module.exports = router;
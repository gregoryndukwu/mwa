const router = require('express').Router();
const gamesController = require('../controllers/games.controllers');
const publisherController = require('../controllers/publisher.controler')

router.route("/games/:gameId/publisher")
    .get(publisherController.getOne)
    .post(publisherController.addOne)

router.route("/games/:gameId")
    .get(gamesController.getOne)
    .delete(gamesController.deleteOne)
    .put(gamesController.updateOne)
    .patch(gamesController.partialUpdate)


router.route("/games")
    .get(gamesController.getAll)
    .post(gamesController.addOne);


module.exports = router;
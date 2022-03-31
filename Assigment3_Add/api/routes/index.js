const addController = require("../controllers/addController");
const router = require("express").Router();
router.route("/add/:n1").get(addController.add);
module.exports = router;
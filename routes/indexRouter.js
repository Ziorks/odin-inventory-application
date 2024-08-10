const { Router } = require("express");
const indexController = require("../controllers/indexController");

const router = Router();

router.get("/", indexController.indexGet); //show homepage with list of all categories

module.exports = router;

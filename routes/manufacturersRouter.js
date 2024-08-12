const { Router } = require("express");
const manufacturerController = require("../controllers/manufacturersController");

const router = Router();

router
  .route("/create")
  .get(manufacturerController.manufacturersCreateGet)
  .post(manufacturerController.manufacturersCreatePost);

module.exports = router;

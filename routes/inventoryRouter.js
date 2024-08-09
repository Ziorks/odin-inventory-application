const { Router } = require("express");
const inventoryController = require("../controllers/inventoryController");

const router = Router();

router.get("/", inventoryController.getIndex);

module.exports = router;

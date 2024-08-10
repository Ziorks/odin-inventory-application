const { Router } = require("express");
const itemsController = require("../controllers/itemsController");

const router = Router();

router.get("/", itemsController.itemsListGet); //show all items

router
  .route("/create")
  .get(itemsController.itemsCreateGet) //show new item form
  .post(itemsController.itemsCreatePost); //create new item

router.get("/:id", itemsController.itemsDetailsGet); //show an items details (link to update & delete)

router
  .route("/:id/update")
  .get(itemsController.itemsUpdateGet) //show item update form
  .post(itemsController.itemsUpdatePost); //update item details

router.post("/:id/delete", itemsController.itemsDeletePost); //delete an item

module.exports = router;

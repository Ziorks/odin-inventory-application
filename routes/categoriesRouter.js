const { Router } = require("express");
const categoriesController = require("../controllers/categoriesController");
const itemsRouter = require("./itemsRouter");

const router = Router();

router.get("/", categoriesController.categoriesListGet); //show all categories

router
  .route("/create")
  .get(categoriesController.categoriesCreateGet) //show new category form
  .post(categoriesController.categoriesCreatePost); //create new category

router.route("/:id").get(categoriesController.categoriesDetailsGet); //show a categories details

router
  .route("/:id/update")
  .get(categoriesController.categoriesUpdateGet) //show category update form
  .post(categoriesController.categoriesUpdatePost); //update category details

router.post("/:id/delete", categoriesController.categoriesDeletePost); //delete a category

router.use("/:id/items", itemsRouter); //show all items for a given category TODO: Pass category id to items router

module.exports = router;

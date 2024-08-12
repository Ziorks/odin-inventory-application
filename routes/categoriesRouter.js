const { Router } = require("express");
const categoriesController = require("../controllers/categoriesController");

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

router
  .route("/:id/delete")
  .get(categoriesController.categoriesDeleteGet) //show category delete form
  .post(categoriesController.categoriesDeletePost); //delete a category

module.exports = router;

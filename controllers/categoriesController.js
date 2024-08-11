const { body, validationResult } = require("express-validator");
const db = require("../db/queries");

const validateCategory = [
  body("name")
    .trim()
    .isAlpha()
    .withMessage("Category must only contain letters.")
    .isLength({ max: 255 })
    .withMessage("Category must be less than 255 characters."),
];

async function categoriesListGet(req, res) {
  const categories = await db.getAllCategories();
  res.render("categories", { title: "Categories", categories });
}

function categoriesCreateGet(req, res) {
  res.render("createCategory", { title: "New Category Form" });
}

const categoriesCreatePost = [
  validateCategory,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("createCategory", {
        title: "New Category Form",
        errors: errors.array(),
      });
    }
    const { name } = req.body;
    // add category to db
    res.redirect("/");
  },
];

function categoriesDetailsGet(req, res) {
  const id = req.params.id;
  //get category info from db and pass it to view
  res.render("categories", { title: `Category ${id}`, id });
}

function categoriesUpdateGet(req, res) {
  //get category from req.params.id and db
  const category = {
    id: 0,
    name: "name",
  };
  res.render("updateCategory", { title: "Update Category Form", category });
}

const categoriesUpdatePost = [
  validateCategory,
  (req, res) => {
    //get category from req.params.id and db
    const category = {
      id: 0,
      name: "name",
    };
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("updateCategory", {
        title: "Update Category Form",
        category,
        errors: errors.array(),
      });
    }
    //add category to db
    res.redirect("/");
  },
];

function categoriesDeletePost(req, res) {}

module.exports = {
  categoriesListGet,
  categoriesCreateGet,
  categoriesCreatePost,
  categoriesDetailsGet,
  categoriesUpdateGet,
  categoriesUpdatePost,
  categoriesDeletePost,
};

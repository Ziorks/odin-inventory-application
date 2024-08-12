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
  res.render("listCategories", { title: "All Categories", categories });
}

function categoriesCreateGet(req, res) {
  res.render("createCategory", { title: "New Category Form" });
}

const categoriesCreatePost = [
  validateCategory,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("createCategory", {
        title: "New Category Form",
        errors: errors.array(),
      });
    }
    const { name } = req.body;
    await db.createCategory(name);
    res.redirect("/");
  },
];

async function categoriesDetailsGet(req, res) {
  const id = req.params.id;
  //consider combining this into one db query
  const category = await db.getCategoryFromId(id);
  const items = await db.getItemsInCategory(id);
  res.render("readCategory", { category, items });
}

async function categoriesUpdateGet(req, res) {
  const id = req.params.id;
  const category = await db.getCategoryFromId(id);
  res.render("updateCategory", { title: "Update Category Form", category });
}

const categoriesUpdatePost = [
  validateCategory,
  async (req, res) => {
    const id = req.params.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const category = await db.getCategoryFromId(id);
      return res.status(400).render("updateCategory", {
        title: "Update Category Form",
        category,
        errors: errors.array(),
      });
    }
    const { name } = req.body;
    await db.updateCategory({ id, name });
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

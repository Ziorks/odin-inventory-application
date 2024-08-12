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

const validateDeletePassword = [
  body("password")
    .equals(process.env.DELETE_PASSWORD)
    .withMessage("Incorrect password."),
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
    res.redirect("/categories");
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
    res.redirect("/categories");
  },
];

async function categoriesDeleteGet(req, res) {
  const categoryId = req.params.id;
  const category = await db.getCategoryFromId(categoryId);
  res.render("deleteCategory", {
    title: "Delete Category Confirmation",
    category,
  });
}

const categoriesDeletePost = [
  validateDeletePassword,
  async (req, res) => {
    const categoryId = req.params.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const category = await db.getCategoryFromId(categoryId);
      return res.status(400).render("deleteCategory", {
        title: "Delete Category Confirmation",
        category,
        errors: errors.array(),
      });
    }
    await db.deleteCategory(categoryId);
    res.redirect("/categories");
  },
];

module.exports = {
  categoriesListGet,
  categoriesCreateGet,
  categoriesCreatePost,
  categoriesDetailsGet,
  categoriesUpdateGet,
  categoriesUpdatePost,
  categoriesDeleteGet,
  categoriesDeletePost,
};

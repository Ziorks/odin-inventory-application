const { body, validationResult } = require("express-validator");
const db = require("../db/queries");

const validateItem = [
  //probably add better validation here
  body("name")
    .trim()
    .isLength({ max: 255 })
    .withMessage("Name must be less than 255 characters."),
  body("description").trim(),
  body("manufacturer"),
  body("categories"),
  body("price")
    .trim()
    .isFloat({ gt: 0 })
    .withMessage("Price must be a number greater than 0."),
  body("quantity").trim().isInt().withMessage("Quantity must be an integer."),
];

async function itemsListGet(req, res) {
  const items = await db.getAllItems();
  res.render("listItems", { title: "Items", items });
}

async function itemsCreateGet(req, res) {
  const manufacturers = await db.getAllManufacturers();
  const categories = await db.getAllCategories();
  res.render("createItem", {
    title: "New Item Form",
    manufacturers,
    categories,
  });
}

const itemsCreatePost = [
  validateItem,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("createItem", {
        title: "New Item Form",
        errors: errors.array(),
      });
    }
    const { name, description, manufacturer, price, quantity } = req.body;
    const categoryIds = [];
    Object.keys(req.body).forEach((key) => {
      if (key.startsWith("category")) {
        categoryIds.push(key.split("_")[1]);
      }
    });
    await db.createItem({
      name,
      description,
      manufacturer,
      price,
      quantity,
      categoryIds,
    });
    res.redirect("/items");
  },
];

async function itemsDetailsGet(req, res) {
  const id = req.params.id;
  //consider combining this into one db query
  const item = await db.getItemFromId(id);
  const manufacturer = await db.getManufacturerFromId(item.manufacturer_id);
  const categories = await db.getCategoriesForItem(id);
  res.render("readItem", { item, manufacturer, categories });
}

async function itemsUpdateGet(req, res) {
  const id = req.params.id;
  const item = await db.getItemFromId(id);
  const manufacturers = await db.getAllManufacturers();
  const categories = await db.getAllCategories();
  const item_categories = await db.getCategoriesForItem(id);
  res.render("updateItem", {
    title: "Update Item Form",
    item,
    manufacturers,
    categories,
    item_categories,
  });
}

const itemsUpdatePost = [
  validateItem,
  async (req, res) => {
    const id = req.params.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const item = await db.getItemFromId(id);
      const manufacturers = await db.getAllManufacturers();
      const categories = await db.getAllCategories();
      const item_categories = await db.getCategoriesForItem(id);
      return res.status(400).render("updateItem", {
        title: "Update Item Form",
        item,
        manufacturers,
        categories,
        item_categories,
        errors: errors.array(),
      });
    }
    const { name, description, manufacturer, price, quantity } = req.body;
    await db.updateItem({
      id,
      name,
      description,
      manufacturer,
      price,
      quantity,
    });

    const categoryIds = [];
    Object.keys(req.body).forEach((key) => {
      if (key.startsWith("category")) {
        categoryIds.push(key.split("_")[1]);
      }
    });
    await db.updateItemCategories(id, categoryIds);
    res.redirect("/items");
  },
];

async function itemsDeletePost(req, res) {
  const itemId = req.params.id;
  await db.deleteItem(itemId);
  res.redirect("/items");
}

module.exports = {
  itemsListGet,
  itemsCreateGet,
  itemsCreatePost,
  itemsDetailsGet,
  itemsUpdateGet,
  itemsUpdatePost,
  itemsDeletePost,
};

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
  //get all items for a given category OR all items if no category
  const items = await db.getAllItems();
  res.render("items", { title: "Items", items });
}

function itemsCreateGet(req, res) {
  res.render("createItem", { title: "New Item Form" });
}

const itemsCreatePost = [
  validateItem,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("createItem", {
        title: "New Item Form",
        errors: errors.array(),
      });
    }
    //add item to db
    res.redirect("/");
  },
];

function itemsDetailsGet(req, res) {
  const id = req.params.id;
  //get item info from db and pass it to view
  res.render("items", { title: `Item ${id}`, id });
}

function itemsUpdateGet(req, res) {
  //get item from req.params.id and db
  const item = {
    id: 0,
    name: "name",
    description: "description",
    manufacturer: "manufacturer",
    categories: [],
    price: 0,
    quantity: 0,
  };
  res.render("updateItem", { title: "Update Item Form", item });
}

const itemsUpdatePost = [
  validateItem,
  (req, res) => {
    //get item from req.params.id and db
    const item = {
      id: 0,
      name: "name",
      description: "description",
      manufacturer: "manufacturer",
      categories: [],
      price: 0,
      quantity: 0,
    };
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("updateItem", {
        title: "Update Item Form",
        item,
        errors: errors.array(),
      });
    }
    //update db
    res.redirect("/");
  },
];

function itemsDeletePost(req, res) {}

module.exports = {
  itemsListGet,
  itemsCreateGet,
  itemsCreatePost,
  itemsDetailsGet,
  itemsUpdateGet,
  itemsUpdatePost,
  itemsDeletePost,
};

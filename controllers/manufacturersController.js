const { body, validationResult } = require("express-validator");
const db = require("../db/queries");

const validateManufacturer = [
  body("name")
    .trim()
    .isLength({ max: 255 })
    .withMessage("Manufacturer must be less than 255 characters."),
];

function manufacturersCreateGet(req, res) {
  res.render("createManufacturer", { title: "New Manufacturer Form" });
}

const manufacturersCreatePost = [
  validateManufacturer,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("createManufacturer", {
        title: "New Manufacturer Form",
        errors: errors.array(),
      });
    }
    const { name } = req.body;
    await db.createManufacturer(name);
    res.redirect("/");
  },
];

module.exports = { manufacturersCreateGet, manufacturersCreatePost };

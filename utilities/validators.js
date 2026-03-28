require("dotenv").config();
const { body } = require("express-validator");

const validateAdminPassword = [
  body("password")
    .equals(process.env.ADMINPASSWORD)
    .withMessage("Incorrect password."),
];

const validateVideogame = [
  body("title"),
  body("description"),
  body("releaseDate"),
  body("quantity"),
  body("developerId"),
  body("publisherId"),
];

const validateDeveloper = [body("developer").trim()];

const validatePublisher = [body("publisher").trim()];

const validateGenre = [body("genre").trim()];

module.exports = {
  validateAdminPassword,
  validateVideogame,
  validateDeveloper,
  validatePublisher,
  validateGenre,
};

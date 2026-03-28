const { Router } = require("express");
const {
  genreListGet,
  genreCreateGet,
  genreCreatePost,
  genreGamesGet,
  genreUpdateGet,
  genreUpdatePost,
  genreDeleteGet,
  genreDeletePost,
} = require("../controllers/genresController");

const router = Router();

router.get("/", genreListGet);
router.route("/create").get(genreCreateGet).post(genreCreatePost);
router.get("/:id", genreGamesGet);
router.route("/:id/update").get(genreUpdateGet).post(genreUpdatePost);
router.route("/:id/delete").get(genreDeleteGet).post(genreDeletePost);

module.exports = router;

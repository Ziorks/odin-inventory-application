const { Router } = require("express");
const {
  videogameListGet,
  videogameCreateGet,
  videogameCreatePost,
  videogameDetailsGet,
  videogameUpdateGet,
  videogameUpdatePost,
  videogameDeleteGet,
  videogameDeletePost,
} = require("../controllers/videogamesController");

const router = Router();

router.get("/", videogameListGet);
router.route("/create").get(videogameCreateGet).post(videogameCreatePost);
router.get("/:id", videogameDetailsGet);
router.route("/:id/update").get(videogameUpdateGet).post(videogameUpdatePost);
router.route("/:id/delete").get(videogameDeleteGet).post(videogameDeletePost);

module.exports = router;

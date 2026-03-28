const { validationResult } = require("express-validator");
const db = require("../db/queries");
const {
  validateAdminPassword,
  validateGenre,
} = require("../utilities/validators");

const genreListGet = async (req, res) => {
  const genres = await db.getAllGenres();
  res.render("genreList", { title: "All Genres", genres });
};

const genreCreateGet = (req, res) => {
  res.render("genreCreate", { title: "Create A New Genre" });
};

const genreCreatePost = [
  validateGenre,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("genreCreate", {
        title: "Create A New Genre",
        errors: errors.array(),
      });
    }
    const { genre } = req.body;
    await db.createGenre({ genre });
    res.redirect("/genres");
  },
];

const genreGamesGet = async (req, res) => {
  const { id } = req.params;
  const genre = await db.getGenre(id);
  const videogames = await db.getGenreVideogames(id);
  res.render("genreGames", {
    title: `${genre.genre} Videogames`,
    genre,
    videogames,
  });
};

const genreUpdateGet = async (req, res) => {
  const { id } = req.params;
  const genre = await db.getGenre(id);
  res.render("genreUpdate", { title: `Edit ${genre.genre}`, genre });
};

const genreUpdatePost = [
  validateGenre,
  async (req, res) => {
    const { id } = req.params;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const genre = await db.getGenre(id);
      return res.status(400).render("genreUpdate", {
        title: `Edit ${genre.genre}`,
        genre,
        errors: errors.array(),
      });
    }
    const { genre } = req.body;
    await db.updateGenre(id, { genre });
    res.redirect("/genres");
  },
];

const genreDeleteGet = async (req, res) => {
  const { id } = req.params;
  const genre = await db.getGenre(id);
  res.render("genreDelete", { title: `Delete ${genre.genre}`, genre });
};

const genreDeletePost = [
  validateAdminPassword,
  async (req, res) => {
    const { id } = req.params;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const genre = await db.getGenre(id);
      return res.status(400).render("genreDelete", {
        title: `Delete ${genre.genre}`,
        genre,
        errors: errors.array(),
      });
    }
    await db.deleteGenre(id);
    res.redirect("/genres");
  },
];

module.exports = {
  genreListGet,
  genreCreateGet,
  genreCreatePost,
  genreGamesGet,
  genreUpdateGet,
  genreUpdatePost,
  genreDeleteGet,
  genreDeletePost,
};

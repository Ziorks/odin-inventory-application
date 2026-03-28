const { validationResult } = require("express-validator");
const db = require("../db/queries");
const {
  validateVideogame,
  validateAdminPassword,
} = require("../utilities/validators");

const videogameListGet = async (req, res) => {
  const videogames = await db.getAllVideogames();
  res.render("videogameList", { title: "All Videogames", videogames });
};

const videogameCreateGet = async (req, res) => {
  const developers = await db.getAllDevelopers();
  const publishers = await db.getAllPublishers();
  const genres = await db.getAllGenres();
  res.render("videogameCreate", {
    title: "Create A New Videogame",
    developers,
    publishers,
    genres,
  });
};

const videogameCreatePost = [
  validateVideogame,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const developers = await db.getAllDevelopers();
      const publishers = await db.getAllPublishers();
      const genres = await db.getAllGenres();
      return res.status(400).render("videogameCreate", {
        title: "Create A New Videogame",
        developers,
        publishers,
        genres,
        errors: errors.array(),
      });
    }
    const {
      title,
      description,
      releaseDate,
      quantity,
      developerId,
      publisherId,
    } = req.body;
    const genreIds = Object.keys(req.body)
      .filter((key) => key.startsWith("genre_"))
      .map((key) => key.split("_")[1]);
    await db.createVideogame({
      title,
      description,
      releaseDate,
      quantity,
      developerId,
      publisherId,
      genreIds,
    });
    res.redirect("/videogames");
  },
];

const videogameDetailsGet = async (req, res) => {
  const { id } = req.params;
  const videogame = await db.getVideogame(id);
  const videogameGenres = await db.getVideogameGenres(id);
  res.render("videogameDetails", {
    title: `${videogame.title} Details`,
    videogame,
    videogameGenres,
  });
};

const videogameUpdateGet = async (req, res) => {
  const { id } = req.params;
  const videogame = await db.getVideogame(id);
  const videogameGenres = await db.getVideogameGenres(id);
  const developers = await db.getAllDevelopers();
  const publishers = await db.getAllPublishers();
  const genres = await db.getAllGenres();
  res.render("videogameUpdate", {
    title: `Edit ${videogame.title}`,
    videogame,
    videogameGenres: videogameGenres.map((genre) => genre.genre_id),
    developers,
    publishers,
    genres,
  });
};

const videogameUpdatePost = [
  validateVideogame,
  async (req, res) => {
    const { id } = req.params;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const videogame = await db.getVideogame(id);
      const videogameGenres = await db.getVideogameGenres(id);
      const developers = await db.getAllDevelopers();
      const publishers = await db.getAllPublishers();
      const genres = await db.getAllGenres();
      return res.status(400).render("videogameUpdate", {
        title: `Edit ${videogame.title}`,
        videogame,
        videogameGenres,
        developers,
        publishers,
        genres,
        errors: errors.array(),
      });
    }
    const {
      title,
      description,
      releaseDate,
      quantity,
      developerId,
      publisherId,
    } = req.body;
    const genreIds = Object.keys(req.body)
      .filter((key) => key.startsWith("genre_"))
      .map((key) => key.split("_")[1]);
    await db.updateVideogame(id, {
      title,
      description,
      releaseDate,
      quantity,
      developerId,
      publisherId,
      genreIds,
    });
    res.redirect("/videogames");
  },
];

const videogameDeleteGet = async (req, res) => {
  const { id } = req.params;
  const videogame = await db.getVideogame(id);
  res.render("videogameDelete", {
    title: `Delete ${videogame.title}`,
    videogame,
  });
};

const videogameDeletePost = [
  validateAdminPassword,
  async (req, res) => {
    const { id } = req.params;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const videogame = await db.getVideogame(id);
      return res.status(400).render("videogameDelete", {
        title: `Delete ${videogame.title}`,
        videogame,
        errors: errors.array(),
      });
    }
    await db.deleteVideogame(id);
    res.redirect("/videogames");
  },
];

module.exports = {
  videogameListGet,
  videogameCreateGet,
  videogameCreatePost,
  videogameDetailsGet,
  videogameUpdateGet,
  videogameUpdatePost,
  videogameDeleteGet,
  videogameDeletePost,
};

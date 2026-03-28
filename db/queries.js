const pool = require("./pool");

async function getAllVideogames() {
  const { rows } = await pool.query(`SELECT * FROM videogame;`);
  return rows;
}

async function getAllDevelopers() {
  const { rows } = await pool.query(`SELECT * FROM developer;`);
  return rows;
}

async function getAllPublishers() {
  const { rows } = await pool.query(`SELECT * FROM publisher;`);
  return rows;
}

async function getAllGenres() {
  const { rows } = await pool.query(`SELECT * FROM genre;`);
  return rows;
}

async function getVideogame(videogameId) {
  const { rows } = await pool.query(
    `
    SELECT videogame.*, TO_CHAR(videogame.release_date, 'Mon DD, YYYY') AS release_date, developer, publisher FROM videogame
    JOIN developer ON videogame.developer_id = developer.developer_id
    JOIN publisher ON videogame.publisher_id = publisher.publisher_id
    WHERE videogame.videogame_id = $1;
    `,
    [videogameId]
  );
  return rows[0];
}

async function getGenre(genreId) {
  const { rows } = await pool.query(
    `
    SELECT * FROM genre
    WHERE genre_id = $1;
    `,
    [genreId]
  );
  return rows[0];
}

async function getVideogameGenres(videogameId) {
  const { rows } = await pool.query(
    `
    SELECT genre.* FROM videogame_genre
    JOIN genre ON videogame_genre.genre_id = genre.genre_id
    WHERE videogame_genre.videogame_id = $1;
    `,
    [videogameId]
  );

  return rows;
}

async function getGenreVideogames(genreId) {
  const { rows } = await pool.query(
    `
    SELECT videogame.videogame_id, videogame.title FROM videogame_genre
    JOIN videogame ON videogame_genre.videogame_id = videogame.videogame_id
    WHERE videogame_genre.genre_id = $1;
    `,
    [genreId]
  );
  return rows;
}

getGenreVideogames(1);

async function createVideogame({
  title,
  description,
  releaseDate,
  quantity,
  developerId,
  publisherId,
  genreIds,
}) {
  const { rows } = await pool.query(
    `
    INSERT INTO videogame (title, description, release_date, quantity, developer_id, publisher_id)
    VALUES
      ($1, $2, $3, $4, $5, $6)
    RETURNING videogame_id;
    `,
    [title, description, releaseDate, quantity, developerId, publisherId]
  );
  const videogameId = rows[0].videogame_id;
  genreIds.forEach(async (genreId) => {
    await pool.query(
      `
      INSERT INTO videogame_genre (videogame_id, genre_id)
      VALUES
        ($1, $2);
      `,
      [videogameId, genreId]
    );
  });
}

async function createGenre({ genre }) {
  await pool.query(
    `
    INSERT INTO genre (genre)
    VALUES
      ($1);
    `,
    [genre]
  );
}

async function updateVideogame(
  videogameId,
  {
    title,
    description,
    releaseDate,
    quantity,
    developerId,
    publisherId,
    genreIds,
  }
) {
  await pool.query(
    `
    UPDATE videogame
    SET
      title = $1,
      description = $2,
      release_date = $3,
      quantity = $4,
      developer_id = $5,
      publisher_id = $6
    WHERE videogame_id = $7;
    `,
    [
      title,
      description,
      releaseDate,
      quantity,
      developerId,
      publisherId,
      videogameId,
    ]
  );
  await pool.query(
    `
    DELETE FROM videogame_genre
    WHERE videogame_id = $1;
    `,
    [videogameId]
  );
  genreIds.forEach(async (genreId) => {
    await pool.query(
      `
      INSERT INTO videogame_genre
      VALUES
        ($1, $2);
      `,
      [videogameId, genreId]
    );
  });
}

async function updateGenre(genreId, { genre }) {
  await pool.query(
    `
    UPDATE genre
    SET
      genre = $1
    WHERE genre_id = $2;
    `,
    [genre, genreId]
  );
}

async function deleteVideogame(videogameId) {
  await pool.query(
    `
    DELETE FROM videogame
    WHERE videogame.videogame_id = $1;
    `,
    [videogameId]
  );
}

async function deleteGenre(genreId) {
  await pool.query(
    `
    DELETE FROM genre
    WHERE genre_id = $1;
    `,
    [genreId]
  );
}

module.exports = {
  getAllVideogames,
  getAllDevelopers,
  getAllPublishers,
  getAllGenres,
  getVideogame,
  getGenre,
  getVideogameGenres,
  getGenreVideogames,
  createVideogame,
  createGenre,
  updateVideogame,
  updateGenre,
  deleteVideogame,
  deleteGenre,
};

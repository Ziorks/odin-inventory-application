require("dotenv").config();
const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS developer (
    developer_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    developer VARCHAR ( 255 ) NOT NULL
);

CREATE TABLE IF NOT EXISTS publisher (
    publisher_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    publisher VARCHAR ( 255 ) NOT NULL
);

CREATE TABLE IF NOT EXISTS genre (
    genre_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    genre VARCHAR ( 255 ) NOT NULL
);

CREATE TABLE IF NOT EXISTS videogame (
    videogame_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title VARCHAR ( 255 ) NOT NULL,
    description TEXT NOT NULL,
    release_date DATE NOT NULL,
    quantity SMALLINT NOT NULL,
    developer_id INTEGER REFERENCES developer (developer_id) ON UPDATE CASCADE,
    publisher_id INTEGER REFERENCES publisher (publisher_id) ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS videogame_genre (
    videogame_id INTEGER REFERENCES videogame (videogame_id) ON UPDATE CASCADE ON DELETE CASCADE,
    genre_id INTEGER REFERENCES genre (genre_id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT videogame_genre_pkey PRIMARY KEY (videogame_id, genre_id)
);

INSERT INTO developer (developer)
VALUES
    ('Valve'),
    ('Bungie'),
    ('FromSoftware');

INSERT INTO publisher (publisher)
VALUES
    ('Valve'),
    ('Microsoft'),
    ('Bandai Namco');

INSERT INTO genre (genre)
VALUES
    ('FPS'),
    ('Singleplayer'),
    ('Multiplayer'),
    ('Action'),
    ('Sci-fi'),
    ('RPG'),
    ('Dark Fantasy');

INSERT INTO videogame (title, description, release_date, quantity, developer_id, publisher_id)
VALUES
    ('Half-Life 2', 'City 17 or whatever.', 'Nov 16,2004', 9, 1, 1),
    ('Halo 3', 'Finish the fight.', 'Sep 25, 2007', 5, 2, 2),
    ('Dark Souls', 'Prepare to die.', 'Aug 24, 2012', 52, 3, 3);

INSERT INTO videogame_genre (videogame_id, genre_id)
VALUES
    (1, 1),
    (1, 2),
    (1, 4),
    (1, 5),
    (2, 1),
    (2, 3),
    (2, 4),
    (2, 5),
    (3, 2),
    (3, 4),
    (3, 6),
    (3, 7);
`;

async function main() {
  console.log("seeding...");

  const client = new Client({
    connectionString: process.env.CONNECTIONSTRING,
  });

  await client.connect();
  await client.query(SQL);
  await client.end();

  console.log("done");
}

main();

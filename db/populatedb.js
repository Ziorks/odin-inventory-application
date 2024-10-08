const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  category VARCHAR ( 255 ) NOT NULL
);

INSERT INTO categories (category)
  VALUES ('Tents'),
         ('Backpacks'),
         ('Sleeping Pads');

CREATE TABLE IF NOT EXISTS manufacturers (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  manufacturer VARCHAR ( 255 ) NOT NULL
);

INSERT INTO manufacturers (manufacturer)
  VALUES ('Nemo'),
         ('Durston'),
         ('Big Agnes'),
         ('MSR'),
         ('Osprey'),
         ('Therm-a-Rest');

CREATE TABLE IF NOT EXISTS items (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  item VARCHAR ( 255 ) NOT NULL,
  description TEXT NOT NULL,
  manufacturer_id INTEGER REFERENCES manufacturers(id) NOT NULL,
  price FLOAT NOT NULL,
  quantity INTEGER NOT NULL
);

INSERT INTO items (item, description, manufacturer_id, price, quantity)
  VALUES ('X-Mid 1P', '1 person trekking pole tent', 2, 296, 14),
         ('Exos', '60 Liter Lightweight backpack', 5, 165, 6),
         ('NeoAir XLite NXT', 'Ultra-light insulated sleeping pad', 6, 200, 8),
         ('Tensor', 'Ultra-light insulated sleeping pad', 1, 180, 3);

CREATE TABLE IF NOT EXISTS item_categories (
  item_id INTEGER REFERENCES items(id),
  category_id INTEGER REFERENCES categories(id),
  CONSTRAINT item_categories_pkey PRIMARY KEY (item_id, category_id)
);

INSERT INTO item_categories (item_id, category_id)
  VALUES (1, 1),
         (2, 2),
         (3, 3),
         (4, 3);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

if (process.env.POPULATE === "true") {
  main();
}

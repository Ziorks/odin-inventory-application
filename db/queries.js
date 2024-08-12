const pool = require("./pool");

async function getAllCategories() {
  const { rows } = await pool.query("SELECT * FROM categories");
  return rows;
}

async function getAllManufacturers() {
  const { rows } = await pool.query("SELECT * FROM manufacturers");
  return rows;
}

async function getAllItems() {
  const { rows } = await pool.query("SELECT * FROM  items");
  return rows;
}

async function getItemFromId(itemId) {
  const { rows } = await pool.query("SELECT * FROM items WHERE id = $1", [
    itemId,
  ]);
  return rows[0];
}

async function getCategoryFromId(categoryId) {
  const { rows } = await pool.query("SELECT * FROM categories WHERE id = $1", [
    categoryId,
  ]);
  return rows[0];
}

async function getManufacturerFromId(manufacturerId) {
  const { rows } = await pool.query(
    "SELECT * FROM manufacturers WHERE id = $1",
    [manufacturerId]
  );
  return rows[0];
}

async function getItemsInCategory(categoryId) {
  const { rows } = await pool.query(
    "SELECT * FROM item_categories JOIN items ON items.id = item_categories.item_id WHERE item_categories.category_id = $1",
    [categoryId]
  );
  return rows;
}

module.exports = {
  getAllCategories,
  getAllManufacturers,
  getAllItems,
  getItemFromId,
  getCategoryFromId,
  getManufacturerFromId,
  getItemsInCategory,
};

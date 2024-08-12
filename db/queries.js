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

async function getCategoriesForItem(itemId) {
  const { rows } = await pool.query(
    "SELECT * FROM item_categories JOIN categories ON categories.id = item_categories.category_id WHERE item_categories.item_id = $1",
    [itemId]
  );
  return rows;
}

async function updateCategory({ id, name }) {
  await pool.query("UPDATE categories SET category = $1 WHERE id = $2", [
    name,
    id,
  ]);
}

async function updateItem({
  id,
  name,
  description,
  manufacturer,
  price,
  quantity,
}) {
  await pool.query(
    "UPDATE items SET item = $1, description = $2, manufacturer_id = $3, price = $4, quantity = $5 WHERE id = $6",
    [name, description, manufacturer, price, quantity, id]
  );
}

async function updateItemCategories(itemId, categoryIds) {
  await pool.query("DELETE FROM item_categories WHERE item_id = $1", [itemId]);
  categoryIds.forEach(async (categoryId) => {
    await pool.query(
      "INSERT INTO item_categories (item_id, category_id) VALUES ($1, $2)",
      [itemId, categoryId]
    );
  });
}

module.exports = {
  getAllCategories,
  getAllManufacturers,
  getAllItems,
  getItemFromId,
  getCategoryFromId,
  getManufacturerFromId,
  getItemsInCategory,
  getCategoriesForItem,
  updateCategory,
  updateItem,
  updateItemCategories,
};

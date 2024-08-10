function categoriesListGet(req, res) {
  //get all categories from db
  res.render("categories", { title: "Categories" });
}

function categoriesCreateGet(req, res) {}

function categoriesCreatePost(req, res) {}

function categoriesDetailsGet(req, res) {
  const id = req.params.id;
  //get category info from db and pass it to view
  res.render("categories", { title: `Category ${id}`, id });
}

function categoriesUpdateGet(req, res) {}

function categoriesUpdatePost(req, res) {}

function categoriesDeletePost(req, res) {}

module.exports = {
  categoriesListGet,
  categoriesCreateGet,
  categoriesCreatePost,
  categoriesDetailsGet,
  categoriesUpdateGet,
  categoriesUpdatePost,
  categoriesDeletePost,
};

function categoriesListGet(req, res) {
  //get all categories from db
  res.render("categories", { title: "Categories" });
}

function categoriesCreateGet(req, res) {
  res.render("createCategory", { title: "New Category Form" });
}

function categoriesCreatePost(req, res) {
  //validate category form
  //if errors - return render of createCategory with errors and status 400
  //else - add category to db
  res.redirect("/");
}

function categoriesDetailsGet(req, res) {
  const id = req.params.id;
  //get category info from db and pass it to view
  res.render("categories", { title: `Category ${id}`, id });
}

function categoriesUpdateGet(req, res) {
  const category = {
    id: 0,
    name: "name",
  };
  res.render("updateCategory", { title: "Update Category Form", category });
}

function categoriesUpdatePost(req, res) {
  //validate category form
  //if errors - return render of updateCategory with errors and status 400
  //else - add category to db
  res.redirect("/");
}

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

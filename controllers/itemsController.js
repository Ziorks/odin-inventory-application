function itemsListGet(req, res) {
  //get all items for a given category OR all items if no category
  res.render("items", { title: "Items" });
}

function itemsCreateGet(req, res) {
  res.render("createItem", { title: "New Item Form" });
}

function itemsCreatePost(req, res) {
  //validate item form
  //if errors - return render of createItem with errors and status 400
  //else - add item to db
  res.redirect("/");
}

function itemsDetailsGet(req, res) {
  const id = req.params.id;
  //get item info from db and pass it to view
  res.render("items", { title: `Item ${id}`, id });
}

function itemsUpdateGet(req, res) {
  const item = {
    id: 0,
    name: "name",
    description: "description",
    manufacturer: "manufacturer",
    categories: [],
    price: 0,
    quantity: 0,
  };
}

function itemsUpdatePost(req, res) {
  //validate item form
  //if errors - return render of updateItem with errors and status 400
  //else - update db
  res.redirect("/");
}

function itemsDeletePost(req, res) {}

module.exports = {
  itemsListGet,
  itemsCreateGet,
  itemsCreatePost,
  itemsDetailsGet,
  itemsUpdateGet,
  itemsUpdatePost,
  itemsDeletePost,
};

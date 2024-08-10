function itemsListGet(req, res) {
  //get all items for a given category OR all items if no category
  res.render("items", { title: "Items" });
}

function itemsCreateGet(req, res) {}

function itemsCreatePost(req, res) {}

function itemsDetailsGet(req, res) {
  const id = req.params.id;
  //get item info from db and pass it to view
  res.render("items", { title: `Item ${id}`, id });
}

function itemsUpdateGet(req, res) {}

function itemsUpdatePost(req, res) {}

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

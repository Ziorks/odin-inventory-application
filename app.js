require("dotenv").config();
const path = require("path");
const express = require("express");
const videogamesRouter = require("./routes/videogamesRouter");
const genresRouter = require("./routes/genresRouter");

const app = express();

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});
app.use("/videogames", videogamesRouter);
app.use("/genres", genresRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

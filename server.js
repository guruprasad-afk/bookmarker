const express = require("express");
require("./App/DB/mongoose");

const BookmarkRoutes = require("./App/Routes/bookmark");
const TagRoutes = require("./App/Routes/tags");

const app = express();

const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/bookmark", BookmarkRoutes);
app.use("/api/tags", TagRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log("Server is running on port: " + port);
});

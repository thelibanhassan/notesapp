const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv").config()
const app = express();
const userRoutes = require("./Routes/userRoutes");

const port = process.env.PORT || 3001;

mongoose
  .connect(process.env.DBURL)
  .then(() => console.log("DB connected"))
  .catch((e) => console.log(e));

app.use(cors())
app.use(express.json());
app.use("/api/notes", userRoutes);

app.use((_, res) => {
  res.send("<h1>Welcome to notes server </h1>");
});
app.listen(port, () => {
  console.log(`app running on http://localhost:${port}`);
});

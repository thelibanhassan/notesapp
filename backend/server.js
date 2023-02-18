const express = require("express");
const mongoose = require("mongoose");
const app = express();
const userRoutes = require("./Routes/userRoutes");
// mongoose.connect("mongodb://localhost:27017/notedb", () =>
//   console.log("DB connected")
// );

mongoose
  .connect("mongodb://localhost:27017/bh_db")
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err);
    console.log("not connected");
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/notes", userRoutes);

app.listen(3000, (req, res) => {
  console.log("app running ...");
});

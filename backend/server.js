const express = require("express");
const mongoose = require("mongoose");
const app = express();
const userRoutes = require("./Routes/userRoutes");

const connectionString = "mongodb://localhost/notesdb";
// mongoose.connect("mongodb://localhost:27017/notedb", () =>
//   console.log("DB connected")
// );

mongoose
  .connect(connectionString, { socketTimeoutMS: 10 })
  .then(() => console.log("connected"))
  .catch((e) => console.log(e));

app.use(express.json());
app.use("/api/notes", userRoutes);

app.listen(3000, (req, res) => {
  console.log("app running ...");
});

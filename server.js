
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const server = express();
const database = mongoose.connection;

const vehiclesRouter = require("./routes/vehicles")
const postsRouter = require("./routes/posts")

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

database.on("error", (error) => {
  console.log(error);
});
database.once("open", () => {
  console.log("connected to database");
});

server.use(express.urlencoded({ extended: true }));
server.use(express.json());

server.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.set(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

server.use("/vehicles", vehiclesRouter);
server.use("/posts", postsRouter);

server.listen(process.env.PORT, () => {
  console.log(`running at http://localhost:${process.env.PORT}`);
});
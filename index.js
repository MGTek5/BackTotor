//create an express api with the following routes:
//GET /users/:id - returns a single user
//POST /users - creates a new user
//PUT /users/:id - updates a user
//DELETE /users/:id - deletes a user
//GET /movie/:id - returns rating for a movie
//POST /movie/:id - creates a new rating for a movie
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());

app.use("/users", require("./routes/users"));
//app.use("/movies", require("./routes/movies"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

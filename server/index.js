const express = require("express");
// A node.js framework that makes it easy to build web applications.
const PORT = process.env.PORT || 4000;
const morgan = require("morgan");
// Morgan is a logger tool used to log all requests made on the server.
const cors = require("cors");
// This is a middleware that can be used to enable CORS with various options.
const bodyParser = require("body-parser");
// body-parser is what allows express to read the request body 
// and then parse that into a JSON object that we can be understood.
const mongoose = require("mongoose");
// An object modeling tool used to asynchronous query MongoDB.
const config = require("./config/db");


const app = express();

//configure database and mongoose
mongoose.set("useCreateIndex", true);
mongoose
  .connect(config.database, { useNewUrlParser: true })
  .then(() => {
    console.log("Database is connected");
  })
  .catch(err => {
    console.log({ database_error: err });
  });
// db configuaration ends here
//registering cors
app.use(cors());
//configure body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//configure body-parser ends here

app.use(morgan("dev")); // configire morgan

// define first route
app.get("/", (req, res) => {
  console.log("Hello MEVN Soldier");
});

const userRoutes = require("./api/user/route/user"); //bring in our user routes
app.use("/user", userRoutes);

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});

import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRoute from "./route/web";
import initAPIRoute from "./route/api";
// import connection from './configs/connectDB'

require("dotenv").config();
var morgan = require("morgan");

const app = express();
const port = process.env.PORT;

app.use((req, res, next) => {
  // check log
  console.log(req.method);
  next();
});

app.use(morgan("combined"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// setup view engine
configViewEngine(app);

// init web route
initWebRoute(app);

//init api route
initAPIRoute(app);

//handle 404 not found
app.use((req, res) => {
  return res.render("not_found.ejs");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

import express from "express";
import configViewEngine from './configs/viewEngine'
require('dotenv').config()

const app = express();
const port = process.env.PORT;
console.log('>>>>> Check Port:', port);

configViewEngine(app);

app.get("/", (req, res) => {
  res.render('index.ejs')
})

app.get("/about", (req, res) => {
  res.send(`I'm KenShine`);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

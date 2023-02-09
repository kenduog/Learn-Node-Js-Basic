let getHomePage = (req, res) => {
  //logic
  return res.render('index.ejs')
}
let getAboutPage = (req, res) => {
  //logic
  return res.send(`I'm KenShine`)
}

module.exports = {
  getHomePage,
  getAboutPage
}

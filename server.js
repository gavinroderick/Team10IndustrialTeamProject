const express = require('express'),
  path = require('path'),
  port = process.env.PORT || 5000,
  app = express()
  routes = require('./routes.js')

//Engine setup
app.use(express.static(path.join(__dirname, 'public')))
.set('views', path.join(__dirname, 'views'))
.set('view engine', 'ejs')

//Importing routes
routes(app)

//404 handling
app.use(function (req, res, next) {
  res.status(404)
  res.render('pages/404')
})

app.listen(port, () => console.log(`Listening on port %s`, port))
module.exports = app

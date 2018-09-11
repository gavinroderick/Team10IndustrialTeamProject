const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

//Engine setup
express()
.use(express.static(path.join(__dirname, 'public')))
.set('views', path.join(__dirname, 'views'))
.set('view engine', 'ejs')

/* Routes go here 
  route template: 
  app.get('*THE URL YOU WANNA TO USE GOES HERE*', (req, res) => res.render('pages/**THE NAME OF THE PAGE WITHOUT .ejs'))
*/
.get('/', (req, res) => res.render('pages/index'))
.get('/test', (req, res) => res.render('pages/TestMap'))




//404
.use(function (req, res, next) {
  res.status(404)
  res.render('pages/404')
})
//Other errors
.use(function (err, req, res, next) {
  console.error(err.stack)
  res.render('pages/error', {error: err, title: err.httpStatusCode})
})

//This needs to be at end of file - keep it here.
.listen(PORT, () => console.log(`Listening on port ${ PORT }`))
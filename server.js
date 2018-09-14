const express = require('express');
const path = require('path');
const port = process.env.PORT || 5000;
const  app = express();
const routes = require('./routes.js');

//Engine setup
app.use(express.static(path.join(__dirname, 'public')))
.set('views', path.join(__dirname, 'views'))
.set('view engine', 'ejs');

//Importing routes
routes(app);

// Setup express static middleware to look for files in the api directory for all requests starting with /api
app.use('/api', express.static('api') , function(req, res){
    // Optional 404 handler
    res.status(404);
    res.json({error:{code:404}})
});

//404 handling
app.use(function (req, res, next) {
  res.status(404);
  res.render('pages/404');
});

app.listen(port, () => console.log(`Listening on port %s`, port));
module.exports = app;

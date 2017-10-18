// server.js
// where your node app starts

// https://howtonode.org/really-simple-file-uploads
// https://coligo.io/building-ajax-file-uploader-with-node/

// init project
var express = require('express');
var app = express();
var multer = require('multer');

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.post('/get-file-size', multer({ dest: './uploads/'}).single('upload'), (req, res) => {
	var name = req.file.originalname;
  var size = req.file.size;
  var type = req.file.mimetype;
  
  var json = {
    filename: name,
    size: size,
    type: type
  };
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(json));
});

// error handling
app.get('*', (req, res, next) => {
  var err = new Error();
  err.status = 404;
  next(err);
});

// handling 404 errors
app.use(function(err, req, res, next) {
  if(err.status !== 404) {
    return next();
  }

  res.send(err.message || "Whoops! That page doesn't exist.");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

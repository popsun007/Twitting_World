var fs = require('fs');
var express = require('express');
// require path so that we can use path stuff like path.join
var path = require('path');
// instantiate the app
var app = express();
// set up a static file server that points to the "client" directory
app.use(express.static(path.join(__dirname, './client')));

// require('./server/config/mongoose.js');

var usersFilePath = path.join(__dirname, './server/globe.json');
app.get('/globe_data', function (req, res){
    var readable = fs.createReadStream(usersFilePath);
    readable.pipe(res);

});

app.listen(8000, function() {
  console.log('Twitting globe app is on: 8000');
});
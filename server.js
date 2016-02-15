var fs = require('fs');
var express = require('express');
// require path so that we can use path stuff like path.join
var path = require('path');
// instantiate the app
var app = express();

app.use(express.static(path.join(__dirname, './client')));

var usersFilePath = path.join(__dirname, './server/world.json');
app.get('/globe_data', function (req, res){
    var readable = fs.createReadStream(usersFilePath);
    readable.pipe(res);

});


var server = app.listen(8888, function() {
  console.log('Twitting globe app is on: 8888');
});

var io = require('socket.io').listen(server);

var	twitter = require('twitter');
var tweets = [];
var twit = new twitter({
	consumer_key: 'YOUR_CONSUMER_KEY',
	consumer_secret: 'YOUR_CONSUMER_SECRET',
	access_token_key: 'YOUR_ACCESS_TOKEN',
	access_token_secret: 'YOUR_ACCESS_TOKEN_SECRET'
})
.stream('statuses/sample', function(stream) {
	stream.on('data', function(tweet){
		if (tweet.geo)
	  	{
	    	data = {
		    	geo: tweet.geo.coordinates.reverse(),
		    	created_at: tweet.created_at,
		    	id_str: tweet.id_str,
		    	screen_name: tweet.user.screen_name,
		    	text: tweet.text
	    	}

	    	tweets.push(data);
	    	io.sockets.emit('stream', tweets);
			console.log(data);
	  	}
	});
});





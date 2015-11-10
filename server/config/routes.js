module.exports = function(app)
	{
		// var obj = JSON.parse(fs.readFileSync('./server/globe.json', 'utf8'));
		var usersFilePath = path.join(__dirname, '../globe.json');
		app.get('/globe_data', function (req, res){
		    var readable = fs.createReadStream(usersFilePath);
		    readable.pipe(res);

		});
	}
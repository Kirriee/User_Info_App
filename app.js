
const express = require ('express');
const fs = require ('fs');
const app = express();

//setting view folder
app.set('views','./');

// setting view engine
app.set('view engine', 'pug');

//do a request
app.get('/', function (request, response){
	console.log("about to render");
	fs.readFile('./users.json', 'utf-8', function (error, data){
		console.log("readfile is working");
		if (error) {
			throw error;
		}
		//we need to parse users.json
		const userList = JSON.parse(data)
		response.render('index', {keyList:userList} );
	});
});

app.listen(3000, function() {
	console.log('server has started');
});

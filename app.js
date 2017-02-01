
const express = require ('express');
const fs = require ('fs');
const bodyParser = require ('body-parser')
const app = express();


//setting view folder
app.set('views','./');

// setting view engine
app.set('view engine', 'pug');
// app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to ssupport URL-encoded bodies
  extended: true
})); 

//do a get request 
app.get('/', function (request, response){
	console.log("about to render");
	fs.readFile('./users.json', 'utf-8', function (error, data){
		console.log("readfile is working");
		if (error) {
			throw error;
		}
		//we need to parse users.json
		const userList = JSON.parse(data)
		response.render('index', {keyList:userList});
	});
});

// do a request that renders a page and display a form
app.get("/search", function(request, response){
	console.log("ik werk ook ");
	response.render('search');
});

//take post request from form displaying matches users on new page
app.post("/signup", function(request, response){
	console.log("ik werk")
	console.log(request.body);
	});

app.listen(3000, function() {
	console.log('server has started')s;
});


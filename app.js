
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
	extended: false
})); 

app.use('/src', express.static('static'))

//redirect page
// app.get('/matching', function (request, response){
// 	console.log("arriving at redirect")
// 	res.render('matching')

// })

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
	console.log("ik werk ook");
	response.render('search');
});



//take post request from form displaying matches users on new page
app.post("/matching", function(request, response){
	console.log("ik werk")
	console.log(request.body.input);
	fs.readFile('./users.json', 'utf-8', function(error, data){
		console.log("readfile post request is working");
		if (error){
			throw error
		}

		const userList = JSON.parse(data)
		let theOne = ""  
		for (var i=0;i<userList.length; i++){
			if (request.body.input === userList[i].firstname || request.body.input === userList[i].lastname){
				theOne = userList[i]
				// Wat als naam twee keer voorkomt?
				// wat als user niet gevonden kan worden?
				// &&(i===userList.length-1)
		// 		{
		// 		var test = userList[i].firstname + " " + userList[i].lastname + " " + userList[i].email;
		// }
		// var test =  "Name: " + userList[i].firstname + " " + "Lastname: " + userList[i].lastname + " " + "Email: " + userList[i].email;
		// response.send(test);
		// 	} else{
		// response.send("User not found")
		// console.log(theOne)
		response.render('matching', {keyList:theOne});
	} 
	
}
});
});


// // do a request that renders a page and display a form
// app.get("/search", function(request, response){
// 	console.log("ik werk ook");
// 	response.render('search');
// });

app.get('/newUser', function (request, response){
	console.log("checken of ik werk");
	response.render('newUser')
});

app.post("/", (request, response) => {
    // console.log("Hey new user:");
    // console.log(request.body.inputfirst);
    // console.log(request.body.inputlast);
    console.log(request.body.inputemail);

    
    fs.readFile('./users.json', 'utf-8', (error, data) => {
    	if (error) {
    		throw error;
    	}
    	else {      		     	
    		const userList = JSON.parse(data);
            userList.push({        //add a user
            	firstname:request.body.inputfirst,
            	lastname:request.body.inputlast,
            	email:request.body.inputemail,
            });
            var json = JSON.stringify(userList);
            console.log("helloooo")
            fs.writeFile('./users.json', json, 'utf-8', (error, data) => {
            	if (error) {
            		throw error;
            	} 
            	// const userList = JSON.parse(data)
            	// // response.render('index', Lisa);
            	// response.render('index', {keyList:userList})
            	// var json = JSON.stringify(userList);
            })
            response.redirect('/') 
        }
        });
});
app.listen(3000, function() {
	console.log('server has started');
});
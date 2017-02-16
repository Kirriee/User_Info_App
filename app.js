
const express = require ('express');
const fs = require ('fs');
const bodyParser = require ('body-parser')
const app = express();


//setting view folder
app.set('views','./views');

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
app.post("/", (request, response) => {
 
    
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
               
            })
            response.redirect('/') 
        }
    });
});


app.post("/matching", function(request, response){
	console.log("ik werk")
	console.log(request.body.input);
	fs.readFile('./users.json', 'utf-8', function(error, data){
		console.log("First readfile post request is working");
		if (error){
			throw error
		}

		const userList = JSON.parse(data)
		var theOne = [];
		for (var i=0;i<userList.length; i++){
			if (userList[i].firstname.indexOf(request.body.input) > -1|| userList[i].lastname.indexOf(request.body.input) > -1){
				// theOne = userList[i]
				theOne.push(userList[i])
				
    } 
}
response.render('matching', {key:theOne});
});
});

app.post('/search', function(request, response){
    console.log(request.body.userInput);
    let result = []
    fs.readFile('./users.json', 'utf-8', function(error, data){
        console.log("Second readfile post request is working");
        if (error){
            throw error
        }

        const userList = JSON.parse(data)
        for (var i=0;i<userList.length; i++){
            if (userList[i].firstname.indexOf(request.body.userInput) > -1 || userList[i].lastname.indexOf(request.body.userInput) > -1){
                result.push(userList[i])
                // response.send({key:theOne})
              
            }
        }
         response.send(result)

         console.log(result)
    })
})

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
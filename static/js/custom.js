	
var keyOld = 0 

$("#searchbox").keyup(function(){
	const keyNew = new Date();
	if (keyNew - keyOld > 300){
		
		var userInput = $("#searchbox").val()
		$.post("/search", {userInput:userInput}, function(data){
			console.log(data[0].firstname)
			console.log(data[0].lastname)
			$('#suggestion-box').empty()
			for (i=0; i<data.length;i++){
				// $("#suggestion-box").show();
				$("#suggestion-box").append('<option>'+data[i].firstname+" " +data[i].lastname+'</option>');
				
			}


		})

			//data meegeven 
			// data behandeld aan server en client katn
			// data uit input (searbar gebruiken
			//copyen van app.js post request checken wat wel of niet copyen

			keyOld = keyNew
	}
	else {
		console.log("too many keypresses")
	}	

})


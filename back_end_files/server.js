var express = require('express');
var app = express();

var fs = require('fs');

// 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 

app.get("/5575/courses", function(req,res) {
	fs.readFile(__dirname + "/" + "courses.json", 'utf-8', 
		function (err, data){
			res.end(data);
		}
	);
}
) ;

var server = app.listen(5575, function() {
		console.log("Node server started to listen to 5575");
});


var express = require('express');
var app = express();
var request = require("request");

app.get("/results", function(req, res) {
    request("http://www.omdbapi.com/?s=california&apikey=thewdb", function(error, response, body){
        if(!error && response.statusCode == 200) {
            const parsedData = JSON.parse(body);
            res.send(parsedData["Search"][0]["Title"]);
        }
   
    });
});




app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server started!!!");
    console.log("Movie app has started!!!");
});

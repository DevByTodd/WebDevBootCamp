const rp = require("request-promise");
const express = require('express');
const app = express();
const request = require("request");

app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("search");
    
})
app.get("/results", function(req, res) {
    const query = req.query.search;
    rp("http://www.omdbapi.com/?s=" + query + "&apikey=thewdb")
    .then((body) => {
            const data = JSON.parse(body);
            res.render("results", {data: data});
            //res.send(parsedData["Search"][0]["Title"]);
            //res.send(`${parsedData.Search}`);
            //res.send(parsedData);
    })
    .catch((err) => {
        console.log('Error!', err);
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server started!!!");
    console.log("Movie app has started!!!");
});

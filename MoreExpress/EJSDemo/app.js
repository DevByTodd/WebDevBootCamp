var express = require("express");
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("home");
    //res.send("<h1>Welcome to the home page! </h1><h2>blah blah </h2>");
});

app.get("/fellinlovewith/:thing", function(req, res){
   var thing = req.params.thing;
   res.render("love", {thingVar: thing });
});

app.get("/posts", function(req, res) {
    var posts = [
        {title: "Post 1", author: "Susy"},
        {title: "my adorable pet bunny", author: "charlie"},
        {title: "Can you believe this pomsky?", author: "colt"},
        
        ];
    
    res.render("posts", {posts: posts});    
        
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("server is listening");
});
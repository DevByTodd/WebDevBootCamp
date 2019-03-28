var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

var friends = ["Tony", "Miranda", "Justin", "Pierre", "Lily"];

app.get("/", function(req, res){
    res.render("home");
});


app.get("/friends", function(req, res){
    //var friends = ["Tony", "Miranda", "Justin", "Pierre", "Lily"];
    res.render("friends", {friends: friends});
    
});

app.post("/addfriend", function(req, res){
    console.log(req.body.newfriend);
    var newFriend = req.body.newfriend;
    friends.push(newFriend);
    //res.send("YOU HAVE REACHED THE POST ROUTE");
    res.redirect("/friends");
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server started!!!");
});
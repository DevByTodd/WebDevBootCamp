var express = require("express");
var app = express();


// "/" => "Hi There!"
app.get("/", function(req, res){
    res.send("Hi There!");
});


// "/bye" => "Goodbuy"
app.get("/bye", function(req, res){
    
    res.send("Goodbye!!");
});

// "/dog" => "Meow!"
app.get("/dog", function(req, res) {
    console.log("Someone Made a Request");
    res.send(" MEOW ");
});

//To get a dynamic page based on a link
//use the oder of the routes and if you use a  ":"
// it acts as a any after the page
app.get("/r/:subredditName", function(req, res) {
    console.log(req.params);
    var subreddit = req.params.subredditName;
    res.send("Welcome to the " + subreddit.toUpperCase() + " Subreddit!");
//    res.send("Welcome to the Subreddit!");
});

app.get("/r/:subredditName/comments/:id/:title/", function(req, res) {
    console.log(req.params);
    var subreddit = req.params.subredditName;
    res.send("Welcome to the Subreddit Comments Page");
});

// order of routes matters 
// when using the catchall "*" it has to go last in the list.
app.get("*", function(req, res) {
   res.send("YOU Are a Stare"); 
});


//Tell Express to listen for request PORT and IP will tell cloud9 what port and what IP
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has Started");
});

var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campground = [
        {name:"Salmon Creek", image: "https://farm3.staticflickr.com/2255/1660066574_f373e4fe97.jpg"},
        {name:"Granite Hill Creek", image: "https://farm4.staticflickr.com/3144/2984126071_c462b62623.jpg"},
        {name:"Mountain Goat's Rest", image: "https://farm2.staticflickr.com/1274/4670974422_ec49d65ab2.jpg"},
        {name:"Salmon Creek", image: "https://farm3.staticflickr.com/2255/1660066574_f373e4fe97.jpg"},
        {name:"Granite Hill Creek", image: "https://farm4.staticflickr.com/3144/2984126071_c462b62623.jpg"},
        {name:"Mountain Goat's Rest", image: "https://farm2.staticflickr.com/1274/4670974422_ec49d65ab2.jpg"}
];

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    
    res.render("campgrounds", {campground:campground});
    
});

app.post("/campgrounds", function(req, res){
   //  res.send("YOU HIT THE POST ROUTE!!")
    //get data from from and add to campgrounds aray
    var name = req.body.name 
    var image = req.body.image
    var newCampground =  {name: name, image: image}
    campground.push(newCampground);
    //redirect back to campgrounds route
    res.redirect("campgrounds");
});

app.get("/campgrounds/new", function(req, res){
   res.render("new.ejs"); 
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp Server Has Started!!");
});
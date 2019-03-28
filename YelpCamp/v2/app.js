var express     = require("express"),
    bodyParser  = require("body-parser"),
    app         = express(),
    mongoose    = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp", { 
    useNewUrlParser: true 
    
});

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//Schema Setup

var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

app.get("/", function(req, res){
    res.render("landing");
});

//INDEX - Show all campgrounds
app.get("/campgrounds", function(req, res){
    // Get all Campgrounds from DB
    Campground.find({}, function(err, campgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("index", {campgrounds:campgrounds});
        } 
    });
});

//CREATE - Add new campgrounds to DB
app.post("/campgrounds", function(req, res){
   //  res.send("YOU HIT THE POST ROUTE!!")
    //get data from from and add to campgrounds aray
    var name = req.body.name 
    var image = req.body.image
    var desc = req.body.description
    var newCampground =  {name: name, image: image, description: desc}
    //Create a new campground and save to db
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect("campgrounds");
        }
    });
});

//NEW - Show form to create new campground
app.get("/campgrounds/new", function(req, res){
   res.render("new.ejs"); 
});

//SHOW - info about one campground
app.get("/campgrounds/:id", function(req, res){
    //find the campround with ID
    Campground.findById(req.params.id, function(err, foundCampground){
       if(err){
           console.log(err);
       } else {
           //render show template with that campround
           res. render("show", {campground: foundCampground});
       }
    });
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp Server Has Started!!");
});
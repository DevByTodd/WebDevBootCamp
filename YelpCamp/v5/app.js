var express     = require("express"),
    bodyParser  = require("body-parser"),
    app         = express(),
    mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    seedDB      = require("./seeds");
    



//Connect to the DB
mongoose.connect("mongodb://localhost/yelp_camp_v3", { 
        useNewUrlParser: true
    //    useCreateIndex: true 
    }).then(() => {
        console.log('connected to DB!');
    }).catch(err => {
        console.log('ERROR:', err.message);
    });

seedDB();

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//Schema Setup
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
            res.render("campgrounds/index", {campgrounds:campgrounds});
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
   res.render("campgrounds/new"); 
});

//SHOW - info about one campground
app.get("/campgrounds/:id", function(req, res){
    //find the campround with ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
       if(err){
           console.log(err);
       } else {
           console.log(foundCampground);
           //render show template with that campround
           res.render("campgrounds/show", {campground: foundCampground});
       }
    });
});


/// ==================
//  Comments ROUTES
/// ==================

app.get("/campgrounds/:id/comments/new", function(req, res){
    
  
//    find the campround with ID
    Campground.findById(req.params.id, function(err, campground){
       if(err){
           console.log(err);
       } else {
           console.log(campground);
           //render show template with that campround
           res.render("comments/new", {campground: campground});
       }
    });
});

//POST
app.post("/campgrounds/:id/comments", function(req, res){
   //lookup campground using ID
   Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect('/campgrounds/' + campground.id);
                } 
            });
        };
   }); 
 });

//
// var PORT = 3000;
//app.listen(process.env.PORT, process.env.IP, function(){
//    console.log("The Server Has Started!!");
//});
// Changed for localhost running the app
app.listen(3000, () => 
    console.log(`Yelp app has started app listening on 3000`)
);

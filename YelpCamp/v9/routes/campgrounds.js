var express = require("express");
var router  = express.Router();
var Campground = require("../models/campground");

//INDEX - Show all campgrounds route
router.get("/", function(req, res){
    console.log(req.user);
    // Get all Campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index",{campgrounds:allCampgrounds});
        } 
    });
});

//CREATE - Add new campgrounds route and add to DB route
router.post("/", isLoggedIn, function(req, res){
    //get data from from and add to campgrounds aray
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }  
    var newCampground =  {name: name, image: image, description: desc, author:author }
    console.log(req.user);
    //Create a new campground and save to db
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
        //redirect back to campgrounds page
            console.log(newlyCreated);
             res.redirect("/campgrounds");
        }
    });
});

//NEW - Show form to create new campground route
router.get("/new", isLoggedIn, function(req, res){
   res.render("campgrounds/new"); 
});

//SHOW route - info about one campground
router.get("/:id", function(req, res){
    //find the campround with ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
       if(err){
           console.log(err);
       } else {
           //console.log(foundCampground)
           //render show template with that campround
           res.render("campgrounds/show", {campground: foundCampground});
       }
    });
});
//Middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}
module.exports = router;
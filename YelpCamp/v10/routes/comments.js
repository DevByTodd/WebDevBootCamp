var express = require("express");
var router  = express.Router({mergeParams: true});
var Comment  =   require("../models/comment");
var Campground  =   require("../models/campground");

/// ==================
//  Comments ROUTES
/// ==================
//Comments new
router.get("/new", isLoggedIn, function(req, res){
    //    find the campround with ID
    console.log(req.params.id);
    Campground.findById(req.params.id, function(err, campground){
        if(err){
           console.log(err);
        } else {
            //render show template with that campround
            res.render("comments/new", {campground: campground});
        }
    });
});
    
//POST
//comments create
router.post("/", isLoggedIn, function(req, res){
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
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    //console.log("New comment's username will be: " + req.user.username);
                    //save comment
                    campground.comments.push(comment);
                    campground.save();
                    console.log(comment);
                    res.redirect('/campgrounds/' + campground.id);
                } 
            });
        };
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
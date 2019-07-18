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

// COMMENT EDIT ROUTE
router.get("/:comment_id/edit", checkCampgroundOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
       if(err){
           res.redirect("back");
       } else {
         res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
       }
    });
 });
// COMMENT UPDATE
router.put("/:comment_id", checkCampgroundOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
       if(err){
           res.redirect("back");
       } else {
           res.redirect("/campgrounds/" + req.params.id );
       }
    });
 });

// COMMENT DESTROY ROUTE
router.delete("/:comment_id", checkCampgroundOwnership, function(req, res){
	//findbyidandRemove
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err){
			res.redirect("back");
		} else {
			res.redirect("/campgrounds/" + req.params.id);
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

function checkCampgroundOwnership(req, res, next) {
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect("back");
            } else {
                //if user is logged in does he own the comment
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                } else {
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("back");
    }
}

module.exports = router;
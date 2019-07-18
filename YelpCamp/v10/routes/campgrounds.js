var express = require("express");
var router  = express.Router();
var Comment =   require('../models/comment');
var Campground = require("../models/campground");

//INDEX - Show all campgrounds route
router.get("/", function(req, res){
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
    };  
    var newCampground =  {name: name, image: image, description: desc, author:author };
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

//EDIT CAMPGROUND ROUTE
router.get("/:id/edit", checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground});
    });
 });
// UPDATE CAMPGROUND ROUTE
router.put("/:id", checkCampgroundOwnership, function(req, res){
    // find and update the correct campgounds
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        } else {
            // redirect somewhere (show Page)
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// DESTROY CAMPGROUND ROUTE
router.delete("/:id", checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndDelete(req.params.id, function(err){
        if(err){
            return next(err);
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }       
    });
});
// router.delete("/:id", checkCampgroundOwnership, function(req, res){
//     Campground.findById(req.params.id, function(err, campgound){
//         Comment.remove({
//             "_id": {
//                 $in: campgound.comments
//             }
//         }, function(er){
//             if(err){
//                 return next(err);
//                 campgound.remove();
//                 // redirect somewhere (show Page)
//                 res.redirect("/campgrounds");
//             }
        
//         })
//     })
// });

//Middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

function checkCampgroundOwnership(req, res, next) {
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                res.redirect("back");
            } else {
                //if user is logged in does he own the campground
                if(foundCampground.author.id.equals(req.user._id)){
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
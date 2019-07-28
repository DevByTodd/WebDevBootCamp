var Comment  =   require("../models/comment");
var Campground  =   require("../models/campground");
// all the middleware goes here
var middlewareObj	=	{};

middlewareObj.checkCampgroundOwnership	= function(req, res, next) {
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
};

middlewareObj.checkCommentsOwnership	= function(req, res, next) {
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
};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};

module.exports = middlewareObj;
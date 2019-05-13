var mongoose    = require("mongoose");
var Campground  = require("./models/campground");
var Comment     = require("./models/comment");

var data = [
    {
        name: "Clouds Rest",
        image: "https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg", 
        description: "Blah Blah Blah 1"
    },
    {
        name: "Clouds Rest",
        image: "https://farm7.staticflickr.com/6014/6015893151_044a2af184.jpg", 
        description: "Blah Blah Blah 2"
    },
    {
        name: "Clouds Rest",
        image: "https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg", 
        description: "Blah Blah Blah 3"
    }
]

 
function seedDB(){
   //Remove all campgrounds
   Campground.deleteMany({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
        Comment.deleteMany({}, function(err) {
            if(err){
                console.log(err);
            }
            console.log("removed comments!");
             //add a few campgrounds
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err)
                    } else {
                        console.log("added a campground");
                        //create a comment
                        Comment.create(
                            {
                                text: "This place is great, but I wish there was internet",
                                author: "Homer"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("Created new comment");
                                }
                            });
                    }
                });
            });
        });
    }); 
    //add a few comments
}
 
module.exports = seedDB;


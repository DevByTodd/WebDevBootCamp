var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo");

// POST - title, content
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});
var Post = mongoose.model("Post", postSchema);

//User - email, name
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts:[postSchema]
});
var User = mongoose.model("User", userSchema);

// var newUser = new User({
//     email: "Bigg@brown.edu",
//     name: "Biggiee Brown"
// });
// newUser.posts.push({
//     title: "how to brew polyjuse potion",
//     content:"this is the new post content"
// });

// newUser.save(function(err, user){
//     if(err){
//         console.log(err);
//     } else {
//         console.log(user);
//     }
// });

// var newPost = new Post({
//     title: "Reflections on Apples",
//     content: "They are Delicious"
// });
// newPost.save(function(err, post){
//         if(err){
//             console.log(err);
//         } else {
//             console.log(post);
//         }
// });

User.findOne({name: "Biggiee Brown"}, function(err, user){
    if(err){
        //console.log(err);
    } else {
        user.posts.push({
            title: "3 thinks I really hate",
            content: "Vldemort. Voldemort"
        });
        user.save(function(err, user){
            if(err) {
                console.log(err);
            } else {
                console.log(user);
            }
        });
    }
});
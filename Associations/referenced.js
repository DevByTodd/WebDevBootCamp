var mongoose = require("mongoose");

//Connect to the DB
mongoose.connect("mongodb://localhost/blog_demo_2", { 
    useNewUrlParser: true
// //    useCreateIndex: true 
//     }).then(() => {
//         console.log('connected to DB!');
//     }).catch(err => {
//         console.log('ERROR:', err.message);
});

var Post = require("./models/post");

// // POST - title, content
// var postSchema = new mongoose.Schema({
//     title: String,
//     content: String
// });
// var Post = mongoose.model("Post", postSchema);

var User = require("./models/user");
// //User - email, name
// var userSchema = new mongoose.Schema({
//     email: String,
//     name: String,
//     posts: [ 
//         {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "Post"
//         }
//     ]
// });
// var User = mongoose.model("User", userSchema);

// User.create({
//     email: "Bob@gmail.com",
//     name: "Bob Belcher"

// });


Post.create({
    title: "How to Cook part 4",
    content: "bASDFASDFASDFA asdfasdfasdfasdfasd"
}, function(err, post){
    User.findOne({email: "Bob@gmail.com"}, function(err, foundUser){
        if(err){
            console.log(err);
        } else {
            foundUser.posts.push(post._id);
            foundUser.save(function(err, data){
                if(err){
                    console.log(err);
                } else {
                    console.log(data);
                } 
            });
        }
    });
});

// User.findOne({name: "Biggiee Brown"}, function(err, user){
//     if(err){
//         //console.log(err);
//     } else {
//         user.posts.push({
//             title: "3 thinks I really hate",
//             content: "Vldemort. Voldemort"
//         });
//         user.save(function(err, user){
//             if(err) {
//                 console.log(err);
//             } else {
//                 console.log(user);
//             }
//         });
//     }
// });
//find user
//find all posts for that user


// User.findOne({email: "Bob@gmail.com"}).populate("posts").exec(function(err, user){
//     if(err){
//         console.log(err);
//     } else {
//         console.log(user);
//     }
// });
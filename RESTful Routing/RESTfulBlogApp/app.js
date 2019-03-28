var bodyParser  =   require("body-parser"), 
    express     =   require("express"),
    mongoose    =   require("mongoose")
    app         =   express();

//APP Config
//Connect to the DB
mongoose.connect("mongodb://localhost/RESTful_Blog_app", { 
    useNewUrlParser: true 
});

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

//MONGOOSE/MODEL CONFIG Mongo DB schema
var blogSchema = mongoose.Schema({
    title:  String,
    image:  String,
    body:   String,
    created: {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog", blogSchema);

//RESTful ROUTES
app.get("/", function(req, res){
    res.redirect("/blogs");
});


//INDEX ROUTE
// app.get("/blogs", function(req, res){
//     Blog.find({}, function(err, blogs){
//         if(err){
//             console.log("ERROR!");
//         } else {
//             res.render("index", {blogs: blogs})
//         }
//     });
// });
app.get("/blogs", function(req, res){
    if(Blog.find({
        "body" : { 
            $exists: true,
            $ne : ""
            }
    }, function(err, blogs) {
          if(err){
           console.log("ERROR!"); 
           
          } else {
             res.render("index", {blogs: blogs}) 
          }
    }));
});

        


//NEW ROUTE
app.get("/blogs/new", function(req, res){
    res.render("new");
});


// CREATE ROUTE
app.post("/blogs", function(req, res){
    //create blog
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            res.render("new");
        } else {
            //then, refresh to the index
            res.redirect("/blogs");
        }
    });
    
})

// Show Route
app.get("/blogs/:id", function(req, res) {
    Blog.findById(req.params.id, function(err, foundBlog){
       if(err){
           res.redirect("/blogs");
       } else {
           res.render("show", {blog: foundBlog});
       }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The Server Has Started!!");
});
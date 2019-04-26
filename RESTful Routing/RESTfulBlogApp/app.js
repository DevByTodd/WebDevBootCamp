var bodyParser          =   require("body-parser"), 
    methodOverride      =   require("method-override"),
    express             =   require("express"),
    mongoose            =   require("mongoose"),
    expressSanitizer    =  require("express-sanitizer"),
    app                 =   express();
    port	            =   3000

//APP Config
//Connect to the DB
mongoose.connect("mongodb://localhost/RESTful_Blog_app", { 
    useNewUrlParser: true
//    useCreateIndex: true 
}).then(() => {
	console.log('connected to DB!');
}).catch(err => {
	console.log('ERROR:', err.message);
});

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));


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
app.post("/blogs", function(req, res, next){
    //create blog
    console.log("======BEFORE========")
    console.log(req.body);
    req.body.blog.body = req.sanitize(req.body.blog.body);
    console.log("======AFTER========")
    console.log(req.body);
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

// Edit 
app.get("/blogs/:id/edit", function(req, res) {
    Blog.findById(req.params.id, function(err, foundBlog){
       if(err){
           res.redirect("/blogs");
       } else {
           res.render("edit", {blog: foundBlog});
       }
    });
});

//UPDATE Route
app.put("/blogs/:id", function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err){
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs/" + req.params.id);
        }
    });
});

//Delete Route
app.delete("/blogs/:id", function(req, res){
    //Destroy blog
    Blog.findByIdAndDelete(req.params.id, function(err){
        if(err){
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs");
        }
    });
    //redirect somewhere
});

//
//app.listen(process.env.PORT, process.env.IP, function(){
//    console.log("The Server Has Started!!");
//});
// Changed for localhost running the app
app.listen(port, () => console.log(`Blog app listening on port ${port}!`))

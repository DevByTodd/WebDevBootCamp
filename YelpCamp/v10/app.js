var express     =   require("express"),
    app         =   express(),
    bodyParser  =   require("body-parser"),
    mongoose    =   require("mongoose"),
    passport    =   require("passport"),
    LocalStrategy   =   require("passport-local"),
    methodOverride  =   require("method-override"),
    Campground  =   require("./models/campground"),
    Comment     =   require("./models/comment"),
    User        =   require("./models/user");
    seedDB      =   require("./seeds");

//requring routes
var commentRoutes       = require("./routes/comments"),
    indexRoutes          = require("./routes/index"),
    campgroundsRoutes   = require("./routes/campgrounds");

//Connect to the DB
mongoose.connect("mongodb://localhost/yelp_camp_v8", { 
        useNewUrlParser: true
    //    useCreateIndex: true 
    }).then(() => {
        console.log('connected to DB!');
    }).catch(err => {
        console.log('ERROR:', err.message);
});

//Mongoose connect to Atlas MongoDB 
// mongoose.connect('mongodb+srv://debbytodd:T0ddrocks1!@cluster0-6nqvj.mongodb.net/test?retryWrites=true&w=majority', {
// 	useNewUrlParser: true,
// 	useCreateIndex: true
// }).then(() => {
// 	console.log('Coneected to DB!!');
// }).catch(err => {
// 	console.log('ERROR:', err.message);
// });

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
 //seedDB(); //seed the db

// PASSPORT CONFIGURATION
//app.use(require("express-session")({
app.use(require("express-session")({
    secret: "Once agin i win the best dev",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//This is global for current user
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

//for the routers and prefix add for route
app.use(indexRoutes);
app.use("/campgrounds", campgroundsRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

// var PORT = 3000;
//app.listen(process.env.PORT, process.env.IP, function(){
//    console.log("The Server Has Started!!");
//});
// Changed for localhost running the app
app.listen(3000, () => 
    console.log(`Yelp app has started app listening on 3000`)
);
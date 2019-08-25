var express     =   require("express"),
    app         =   express(),
    bodyParser  =   require("body-parser"),
    mongoose    =   require("mongoose"),
	flash		=	require("connect-flash"),
    passport    =   require("passport"),
    LocalStrategy   =   require("passport-local"),
    methodOverride  =   require("method-override"),
    Campground  =   require("./models/campground"),
    Comment     =   require("./models/comment"),
    User        =   require("./models/user"),
    seedDB      =   require("./seeds");

//requring routes
var commentRoutes       = require("./routes/comments"),
    indexRoutes          = require("./routes/index"),
    campgroundsRoutes   = require("./routes/campgrounds");

//DB ENV variable Set the local ENV for your solution.
// for Prod or cloud DB, with Atlas MongoDB set 
// DATABASEURL to 
// mongodb+srv://debbytodd:T0ddrocks1!@cluster0-iuoku.mongodb.net/test?retryWrites=true&w=majority
//
// For local ENV DB set 
// DATABASEURL to 
// mongodb://localhost/yelp_camp_v12
// in console 
// export DATABASEURL=

const dbURL = process.env.DATABASEURL || "mongodb://localhost/yelp_camp_v12";
mongoose.connect(dbURL, { 
        useNewUrlParser: true,
     	useCreateIndex: true 
    }).then(() => {
        console.log('connected to DB! ' + dbURL);
    }).catch(err => {
        console.log('ERROR:', err.message);
});

// mongoose.connect('mongodb+srv://debbytodd:T0ddrocks1!@cluster0-iuoku.mongodb.net/test?retryWrites=true&w=majority', {
// 	useNewUrlParser: true,
// 	useCreateIndex: true
// }).then(() => {
// 	console.log('Coneected to DB on MongoDB Atlas!!');
// }).catch(err => {
// 	console.log('ERROR:', err.message);
// });

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
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
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
    next();
});

//for the routers and prefix add for route
app.use(indexRoutes);
app.use("/campgrounds", campgroundsRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(process.env.PORT ||3000, function(){
   console.log("The YelpCamp Server Has Started! Listening on port %d in %s mode");
});

//Changed for localhost running the app
// var PORT = 3000;
// app.listen(3000, () => 
//     console.log(`Yelp app has started app listening on 3000`)
// );
var express 				= require("express"),
	mongoose 				= require("mongoose"),
	passport 				= require("passport"),
	bodyParser 				= require("body-parser"),
	User					= require("./models/user"),
	LocalStrategy 			= require("passport-local"),
	passportLocalMongoose 	= require("passport-local-mongoose");

 //mongoose.connect('mongodb+srv://debbytodd:T0ddrocks1!@cluster0-6nqvj.mongodb.net/test?retryWrites=true', {
mongoose.connect("mongodb://localhost/AuthDemo", { 
	useNewUrlParser: true,
	useCreateIndex: true
}).then(() => {
	console.log('Coneected to DB!!');
}).catch(err => {
	console.log('ERROR:', err.message);
});

var app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(require("express-session")({
	secret: "Todd is the Best",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//=============
// ROUTES
//=============

 app.get("/", function(req, res){
     res.render("home");
 });

app.get("/secret", function(req, res){
    res.render("secret");
});

// Auth Routes

//show sign up form
app.get("/register", function(req, res){
	res.render("register");
});

app.post("/register", function(req, res){
	res.send("REGISTER POST ROUTE");
	req.body.username
	req.body.password
	User.register(new User({username: req.body.username}), req.body.password, function(err, user){
		if(err){
			console.log(err);
			return res.render('register');
		}
		passport.authenticate("local")(req, res, function(){
			res.redirect("/secret");
		});
	})
});

//handling user sign up
app.post("/register", function(req, res){
	User.register(new User({username: req.body.username}), reg.body.password, function(err, user) {
		if(err){
            console.log(err);
            return res.render('register');
        }
        passport.authenticate("local")(req, res, function(){
           res.redirect("/secret");
        });
	});
});



// Changed for localhost running the app
app.listen(3000, () => 
console.log(`Yelp app has started app listening on 3000`)
);
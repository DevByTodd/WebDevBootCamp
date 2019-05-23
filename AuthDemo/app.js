var express = require("express");

 var app = express();
 app.set('view engine', 'ejs');

 //mongoose.connect('mongodb+srv://debbytodd:T0ddrocks1!@cluster0-6nqvj.mongodb.net/test?retryWrites=true', {
mongoose.connect("mongodb://localhost/AuthDemo", { 
	useNewUrlParser: true,
	useCreateIndex: true
}).then(() => {
	console.log('Coneected to DB!!');
}).catch(err => {
	console.log('ERROR:', err.message);
});

const PostSchema = new mongoose.Schema({
	title: String,
	description: String,
});

 app.get("/", function(req, res){
     res.render("home");
 });

app.get("/secret", function(req, res){
    res.render("secret");
});




// Changed for localhost running the app
app.listen(3000, () => 
console.log(`Yelp app has started app listening on 3000`)
);
const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://debbytodd:T0ddrocks1!@cluster0-6nqvj.mongodb.net/test?retryWrites=true', {
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

const Post = mongoose.model("Post", PostSchema);

app.get('/', async (req, res) => {
	let post = await Post.create({title: 'test', description: 'This is a test'});
	res.send(post);
});

app.listen(3000, () => {
	console.log('server listening on port 3000');
});

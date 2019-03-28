var express = require("express");
var app = express();

//visiting / should pring Hi there, welcome to my assignment!

app.get("/", function(req, res){
    res.send("Hi there, welcome to my assignment!");
});

//visiting /speak/pig should print the pig says 'Oink'
//visiting /speak/cow should print "the cow says 'Moo'"
//visiting /speak/dog should print "The dog says 'Woof, Woof'""

app.get("/speak/:animal", function(req, res) {
    console.log(req.params);
    
    var sounds = {
        pig: "Oink",
        cow: "Moo",
        dog: "Woof, Woof",
        cat: "I hate you human",
        goldfish: "....."
    }
    
    var animal = req.params.animal.toLowerCase();
    var sound = sounds[animal];
    
    res.send("The " + animal + " Says '" + sound + "'");
    
});

app.get("/repeat/:message/:times", function(req, res) {
   console.log(req.params);
   var message = req.params.message;
   var times = Number(req.params.times);
   var result = "";
   
   for(var i = 0; i < times ; i++) {
       result += message + " ";
   }
   res.send(result + " ");
});




// when using the catch all "*" it has to go last in the list.
app.get("*", function(req, res) {
   res.send("Sorry, page not found...What are you doing with your life?"); 
});


//Tell Express to listen for request PORT and IP will tell cloud9 what port and what IP
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has Started");
});

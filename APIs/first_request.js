// const request = require('request');
// request('http://www.google.com', function (error, response, body) {
//   console.log('error:', error); // Print the error if one occurred
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   console.log('body:', body); // Print the HTML for the Google homepage.
// });

//nconst request = require("request");
//THIS IS ES^
const rp = require("request-promise");

//console.log("Sunset in Hawaii is at ...");
//request('https://jsonplaceholder.typicode.com/users/1', function(error, response, body) {

//rp('https://jsonplaceholder.typicode.com/users/1') 

rp('http://www.omdbapi.com/?i=tt3896198&apikey=thewdb') 
    .then((body) => {
        const parsedData = JSON.parse(body);
        //console.log(`${parsedData.name} lives in ${parsedData.address.city}`);
        console.log(body);
    })
    .catch((err) => {
        console.log('Error!', err);
        
    });
  
//   if(!error && response.statusCode == 200) {
//       const parsedData = JSON.parse(body);
//       //console.log(parsedData["name"]["results"]["channel"]["astronomy"]["sunset"]);
//       console.log(`${parsedData.name} lives in ${parsedData.address.city}`);
//   } 
// })

//General search: http://www.omdbapi.com/?s=guardians+of+the+galaxy&apikey=thewdb 
//Search with Movie ID: http://www.omdbapi.com/?i=tt3896198&apikey=thewdb 
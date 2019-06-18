#YelpCamp

##Initial Setup
* Add Landing Page
* Add Campgrounds Page that lists all campgrounds

Each Campground has:
   * Name
   * Image

#Layout and Basic Styling
* Create our header and footer partials
* Add in Bootstrap

#Creating New Campgrounds
* Setup new campground POST route
* Add in body-parser
* Setup route to show form
* Add basic unstyled form

#Style the campgrounds page
* Add a better header/title
* Make campgrounds display in a grid

#Style the Navbar and Form
* Add a navbar to all templates
* Style the new campground form

#Add Mongoose
* Install and configure Mongoose
* Setup campground model
* Use campground model inside of our routes

#Show Page
* Review the RESTful routes we've seen so far
* Add description to our campground model
* Show db.collection.drop()
* Add a show route/template

#Refactor Mongoose Code
* Create a models directory
* Use module.exports
* Require everything correctly!

#Add Seeds File
* Add a seeds.js file
* Run the seeds file every time the server starts

#Add the Comment model!
* Make our errors go away!
* Display comments on campground show page

#Comment New/Create
* Discuss nested routes
* Add the comment new and create routes
* Add the new comment from



RESTFUL ROUTES

name      url      verb    desc.
===============================================
INDEX   /dogs      GET   Display a list of all dog
NEW     /dogs/new  GET   Displays form to make a new dog
CREATE  /dogs      POST  Add new dog to DB
SHOW    /dogs/:id  GET   Shows info about one dog

we will create a nested route

NEW      /campgrounds/:id/comments/new    GET
Create   /campgrounds/:id/comments        POST

#Style Show Page
* Add sidebar to show page
* Display  comments nicely 

## Finish Styling Show Page
* Add public directory
* Add custom stylesheet

##Intro to Auth
* What tools are we using?
   * Passport
   * Passport local
   * Passport Local Mongoose

* Walk through auth flow
* Discuss session 
   * Express-Session

## Auth Pt. 1 - Add User Model
* Install all packages needed for Auth
* Define User model

## Auth Pt. 2 - Register
* Configure Passport
* Add register routes
* Add register template
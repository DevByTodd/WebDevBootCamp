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

##Auth Pt. 3 - Login
* Add logout route
* Add login template

##Auth Pt. 4 - Logout/Navbar
* Add logout route
* Prevent user from adding a comment if not signed in
* Add links to navbar
* Show/hide auth links correctly 

##Auth Pt. 5 - Show/Hide Links
* Show/hid auth links in navbar correctly
* Show user logged in in navbar 

##Rafactor the Routes
* Use Express router to reoragnize all routes

##Users + Comments
* Associate users and comments
* Save authers's Name to a comment automatically

##Users + Campgrounds
* Prevent an unauthenticated user from creating a campground
* Save username+ID to newly created campground

# Editing Campgrounds
* Add Method-Override
* Add Edit Route for Campgrounds
* Add Link to Edit Page
* Add Update Route

#Deleting Campgrounds
* Add Destroy Route
   * make it delete all comments with post
* Add Delete button

#Authorization Part 1: Campgrounds
* User can only edit his/her campgrounds
* User can only delete his/her campgrounds
* Hide/Show edit and delete buttons

#Editing Comments
* Add Edit route for comments
* Add Edit button
* Add Update route

Campground Edit Route: <!--/campgrounds/:id/edit-->
Comment Edit Route:   <!--/campgrounds/:id/comments/:comment_id/edit-->

#Deleting Comments
* Add Destroy route
* Add Delete button

Campground Destroy Route: /campgrounds/:id
Comment Destroy Route:    /campgrounds/:id/comments/:comment_id

#Authorization Part 2: Comments
* User can only edit his/her comments
* User can only delete his/her comments
* Hide/Show edit and delete buttons
* Refactor Middleware

#Adding in Flash1
* Demo Working Version
* Install and configure connect-flash
* add bootstrap alerts to header

* BOOTSTRAP NAV COLLPASE JS
* Flash Messages
* Refactor container div to header
* Show/hide delete and update buttons
* style login/register forms
* Random Background Landing Page
* Refactor middleware
* change styling in show template - comment delete/update
* UPDATE/DELETE CAMPGROUND


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

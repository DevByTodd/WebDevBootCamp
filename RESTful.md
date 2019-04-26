RESTful Routing 

##Introduction
* Define REST and explain WHY it matters
* List all 7 RESTful routes
* Show examples of RESTful routing in practice

REST - a mapping between HTTP routes and CRUD

CREAT
READ
UPDATE
DESTROY

RESTful Routes

Name            Path                HTTP Verb  Purpose                                              Mongoose Method
Index           /dogs               GET        List all Dogs                                        Dog.find()
New             /dogs/new           GET        Show new Dogs form                                   N/A
Create          /dogs               POST       Create a new dog, then redirect somewhere            Dog.Create()
Show            /dogs/:id           GET        Show info about one specific dog                     Dog.findById()
Edit            /dogs/:id/edit      GET        Show edit form for one dog/id                        Dog.findById()
Update          /dogs/:id           PUT        Update a particular dog, then redirect somewhere     Dog.findByIdAndUpdate()
Destroy         /dogs:id            DELETE     Delete a particular dog, then redirect somewhere     Dog.findByIdAndRemove()

##Blog Index
* SEtup the Blog App
* Create the Blog model
* Add INDEX route and templet
* Add Simple Nav Bar

##Basic Layour
* Add Header and Footer
* Include Semantic UI
* Add Simple Nav

##Putting the C in CRUD
* Add NEW route
* Add New templete
* Add CREATE route
* Add Create templete

##SHOWtime
* Add Show route
* Add Show Template
* Add links to show page
* Style show template

#Edit/Update
* Add Edit Route
* Add Edit Form
* Add Update Route
* Add Update Form
* Add Method-Override

#Destroyyyyyy
* Add Destroy Route
* Add Edit and Destroy links

##Final Touches
* Sanitize blog body
* Style Index
* Update REST Table







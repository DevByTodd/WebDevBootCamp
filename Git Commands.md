Git commands

//do this for each update
git diff
git status
git add -A
git commit -m "what we changed"
git pull origin master
git push origin master

//To start a local repo cd into the directory and do 
git init 

//Clone a remote repository 
git clone <URL> <where to clone>
git clone https://github.com/DevByTodd/WebDevBootCamp.git .

//this shows us what is the status of our reporitory
git status 

//This will add the file
git add FILE

//This will add all files that are changed
git add -A

// to see the changes or diff of a file
git diff

// to commite a file
git commit -m "what we changed"

//To remove files from staging area
git reset

//to see the log of the changes
git log

//to view remote repository
git remote -v
git branch -a

//To push to remote
// this will pull all changes on remote
git pull origin master

// this will push all changes to remote
git push origin master

//WORKING WITH BRANCHES use this is your are working on a diff feature
//will show the branches
git branch 
 
//could be WebDevBootCamp-authentication
//git branch WebDevBootCamp-authentication
git branch <name of branch>

//This will chech out that branch
//git checkout WebDevBootCamp-authentication
git checkout <name of branches>

//to push to the remote responsitory 
git push -u origin calc-divide

git branch -a

//Merge a branch
git checkout master

git pull origin master

git branch --merged

git merge <name of branch>

git push origin master

//delete the branch
git branch --merged
git branch -d <anme of branch>
git branch -a
git push origin --delete <name of branch>







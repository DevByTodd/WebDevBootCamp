//Create a file echo.js
// create a function named echo that takes two arguments: string and a number
// it should print out the string, number of times

function echo(str, num){
    for(var i = 0; i < num; i++){
        console.log(str); 
    }
}

echo("Echo!!!", 10)
echo("Tater Tots", 3)
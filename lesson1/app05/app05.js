const fs = require ("fs");
console.log("Going to get a file");
fs.readFile("shortFile.txt", function(err,buffer){
    console.log("Got the file",buffer.toString().substring(0,21));
});
console.log("App continues...");
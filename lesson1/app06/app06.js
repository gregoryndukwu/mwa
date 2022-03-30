const fs = require("fs");
const printFileFirstLine = function(err,buffer){ // Aqui o professor passou file, no lugar de buffer causando um erro
    console.log("Got the file",buffer.toString().substring(0,21));
}
console.log("1: Get a file");
fs.readFile("longfile.txt", printFileFirstLine);
console.log("3: App continues...");
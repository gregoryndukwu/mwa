const http = require("http");
const fs = require("fs");
const serveAllRequests = function (req, res) {
    const type = req.method;
    let statusCode;
    let fileBuffer;

    if (type == 'GET') {
       
    switch (req.url) {
        case "/page2":
            fs.readFile(__dirname + "\\page2.html",
                function (err, buffer) {
                    if (err) {
                        statusCode = 404;
                        fileBuffer = "File not Found";
                    } else {
                        statusCode = 200;
                        fileBuffer = buffer;
                    }
                    res.writeHead(statusCode);
                    res.end(fileBuffer);
                });
            break;
        case "/page1":
            fs.readFile(__dirname + "\\page1.html",
                function (err, buffer) {
                    if (err) {
                        statusCode = 404;
                        fileBuffer = "File not Found";
                    } else {
                        statusCode = 200;
                        fileBuffer = buffer;
                    }
                    res.writeHead(statusCode);
                    res.end(fileBuffer);
                });
            break;
        case "/":
            res.setHeader("Content-Type", "text/html");
            fs.readFile(__dirname + "\\index.html",
                function (err, buffer) {
                    if (err) {
                        statusCode = 404;
                        fileBuffer = "File not Found";
                    } else {
                        statusCode = 200;
                        fileBuffer = buffer;
                    }
                    res.writeHead(statusCode);
                    res.end(fileBuffer);
                });
            break;

    }
  }else if (type == 'POST') {
        res.setHeader("Content-Type", "application/json");
        res.writeHead(200);
        res.end("{'message' : 'This is Assigment 2 without Jason Without Express Much more job to do'}");
    }


}
const server =
    http.createServer(serveAllRequests);
server.listen(8080, "localhost",
    function () {
        console.log("Server is running on http://localhost:8080");
    });
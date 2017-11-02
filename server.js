var http = require("http"),
    normalize = require("normalize-url"),
    fs = require("fs");
    moment = require("moment");


var server = http.createServer(function(req, res) {
    if (req.url === "/") {
        fs.readFile("./index.html", "utf8", function(err, file){
            if (err) throw new Error("Problem getting index.html");
            res.writeHead(200, { 'content-type': 'text/plain' });
            res.end(file);
        });
    } else {
        var formattedString = (req.url.slice(1).replace(/\%20/g, "")),
            options = {year: 'numeric', month: 'long', day: 'numeric'};
        
        res.writeHead(200, { 'content-type': 'text/plain' });

        if (Date.parse(formattedString)) {
            res.end(JSON.stringify({unix: new Date(formattedString).getTime() / 1000, natural: new Date(formattedString).toLocaleDateString("en-us", options)}));
        } else if(new Date().setSeconds(formattedString)) {
            res.end(JSON.stringify({unix: formattedString, natural: new Date(formattedString * 1000).toLocaleDateString("en-us", options)}));
        } else {
            res.end(JSON.stringify({unix: null, natural: null}));
        }
    }    
});


server.listen(process.env.port || 3000);
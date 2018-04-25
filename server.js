var http = require('http');
var server = http.createServer(function(req,res){
    res.writeHead(200, {"Content-Type":"text/html"});
    res.end('<p>Salut tout le<strong> monde</strong> !</p> ');
});
server.listen(8080);
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var port = 9999;

app.get('/', function(request, response) {
  response.send('Hello World!')
})

app.get('/api', function(request, response) {
  var apiStatus = {"status":"The GitLogger API is currently running"}
  response.json(apiStatus);
})

server.listen(port, function() {
  console.log('Server listening on port ' + port);
});

module.exports = server;
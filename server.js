var express = require('express');
var app = express();
var server = require('http').createServer(app);
var port = 9999;
var https = require('https');

app.get('/', function(request, response) {
  response.send('Hello World!')
})

app.get('/api', function(request, response) {
  var apiStatus = {"status":"The GitLogger API is currently running"}
  response.json(apiStatus);
})

app.get('/api/commits/bebbs/BorisBikes', function(request, response) {
  var options = {
    host: 'api.github.com',
    path: '/repos/bebbs/BorisBikes/commits',
    headers: {'User-Agent': 'GitLogger'},
    method: 'GET'
  };

  callback = function(res) {
    var str = '';

    res.on('data', function(chunk) {
      str += chunk;
    });

    res.on('end', function() {
      response.json(JSON.parse(str));
    });

    res.on('error', function(e) {
      console.log('Error: ' + e);
    });
  };

  https.request(options, callback).end();
});

server.listen(port, function() {
  console.log('Server listening on port ' + port);
});

module.exports = server;

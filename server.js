var express = require('express');
var app = express();
var server = require('http').createServer(app);
var port = 9999;
var https = require('https');

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});

app.get('/', function(request, response) {
  response.send('client/index.html')
})

app.get('/api', function(request, response) {
  var apiStatus = {"status":"The GitLogger API is currently running"}
  response.json(apiStatus);
})

app.get('/api/commits/:user/:repo', function(request, response) {

  var user = request.params.user;
  var repo = request.params.repo;

  var options = {
    host: 'api.github.com',
    path: '/repos/' + user + '/' + repo + '/commits',
    headers: {'User-Agent': 'GitLogger'},
    method: 'GET'
  };


  function grabData(res) {
    var str = '';

    res.on('data', function(chunk) {
      str += chunk;
    });

    res.on('end', function() {
      extractInfo(JSON.parse(str), response);
    });

    res.on('error', function(e) {
      console.log('Error: ' + e);
    });
  };

  https.request(options, grabData).end();

});


function extractInfo(data, response) {
  var hash = {};
  for(var i = 0; i <= data.length-1; i++) {
    buildHash(hash, i, data)
  }
  response.json(hash);
};

function buildHash(hash, i, data) {
  hash[i] = {
              "message": data[i].commit.message,
              "sha": data[i].sha
            }
}

server.listen(port, function() {
  console.log('Server listening on port ' + port);
});

module.exports = server;

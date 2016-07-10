var fs = require('fs');
var path = require('path');

var marked = require('marked');
var express = require('express');

var Search = require('./search');

var app = express();

app.get('/', function (req, res) {
  var readme = fs.readFileSync(path.join(__dirname, 'README.md'), 'utf8');
  res.send(marked(readme));
});

app.get('/api/imagesearch/:term', function (req, res) {
  Search.runSearch(req.params.term, req.query.offset || 0)
    .then(function (result) {
      res.json(result);
    });
});

app.get('/api/latest/imagesearch', function (req, res) {
  res.json(Search.getLast());
});

var port = process.env.PORT || 8080;
app.listen(port, function () {
  console.log('App listening on port ' + port + '!');
});

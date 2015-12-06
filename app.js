var express = require('express');
var tweets = require('./routes/tweets');
var app = express();

app.use(express.static(__dirname + '/public'));
app.use('/tweets', tweets);
app.use('/favicon.ico', express.static('favicon.ico'));

var port = process.env.PORT || 8000;

app.listen(port);

module.exports = app;
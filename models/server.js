var express = require('express');
var auth = express();
var bodyparser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');

var jwt = require('jsonwebtoken');
var config = require('./config.js');
var User = require('./models/user');
var port = process.env.PORT || 8080; //declaring port maybe?
mongoose.connect(config.database);
app.set('superSecret', config.secret)

app.use(bodyParser.urlencoded({ extended: false }))	//extended: false?
app.use(bodyParser.json());

app.use(morgan('dev'));

app.get('/', function(req,res) {
	res.send('Hello! the API is at http://localhost:' + port + '/api');
})

app.listen(port):
console.log('shit happens at http://localhotst:' + port);
var express = require('express');
var auth = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');

var jwt = require('jsonwebtoken');
var config = require('./config.js');
var User = require('./models/user');
var port = process.env.PORT || 8080; //declaring port maybe?
mongoose.connect(config.database);
auth.set('superSecret', config.secret)

auth.use(bodyParser.urlencoded({ extended: false }))	//extended: false?
auth.use(bodyParser.json());

auth.use(morgan('dev'));


auth.get('/', function(req,res) {
	res.send('Hello! the API is at http://localhost:' + port + '/api');
})

auth.listen(port);
console.log('shit happens at http://localhotst:' + port);

auth.get('/setup', function(req, res) {

  // create a sample user
  var nick = new User({ 
    name: 'Nick Cerminara', 
    password: 'password',
    admin: true 
  });

  // save the sample user
  nick.save(function(err) {
    if (err) throw err;

    console.log('User saved successfully');
    res.json({ success: true });
  });
});

var apiRoutes = express.Router();

apiRoutes.use(function(req, res, next) {
	var token = req.body.token || req.query.token || req.headers['x-access-token'];

	if(token) {
		jwt.verify(token, app.get('superSecret'), function(err, decoded) {
			if (err) {
				return res.json({success: false, message: 'failed to authenticate token'});
		} else {
			req.decoded = decoded;
			next();
		}

		});

	} else {
		return res.json({success: false, message: 'no token provided'});
	}

});

apiRoutes.post('/authenticate', function(req, res) {

  // find the user
  User.findOne({
    name: req.body.name
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if user is found and password is right
        // create a token
        var token = jwt.sign(user, app.get('superSecret'), {
          expiresInMinutes: 1440 // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }   

    }

  });
});

apiRoutes.get('/', function(req, res) {
	res.json({message: 'Welcome to the collest API on earth!'});
});

apiRoutes.get('/users', function(req, res) {
 User.find({}, function(err, users) {
 	res.json(users);
 });
});

auth.use('/api', apiRoutes);
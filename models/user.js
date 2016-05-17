var mongoose = require('mongoose'); //require mongoose for mongoDB
var Schema = mongoose.Schema;	//Schema an object of mongoose(dekho kya hota hai)
module.exports = mongoose.model('User', new Schema({	//i guess mongoose mein ek naya model bana rahe hain user ke naam ka
		name: String,
		password: String,
		admin: Boolean, //ye kya ho gya? :P(we will see)
	}));
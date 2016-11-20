'use strict';

var Users = require('../models/users.js');
var Polls = require('../models/polls.js');

function ClickHandler () {

    this.getClicks = function (req, res) {
	Users
	    .findOne({ 'github.id': req.user.github.id }, { '_id': false })
	    .exec(function (err, result) {
		if (err) { throw err; }

		res.json(result.poll);
	    });
    };

    this.addClick = function (req, res) {
	Users
	    .findOneAndUpdate({ 'github.id': req.user.github.id }, { $inc: { 'poll.options.0.count': 1 } })
	    .exec(function (err, result) {
		if (err) { throw err; }

		res.json(result.poll);
	    });
    };

    this.resetClicks = function (req, res) {
	Users
	    .findOneAndUpdate({ 'github.id': req.user.github.id }, { 'poll.options.0.count': 0 })
	    .exec(function (err, result) {
		if (err) { throw err; }
		res.json(result.poll);
	    });
    };

}

module.exports = ClickHandler;

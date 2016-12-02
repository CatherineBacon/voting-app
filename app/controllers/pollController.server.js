'use strict';

var Polls = require('../models/polls.js');
var Users = require('../models/users.js');

function pollHandler () {

    this.getPolls = function (req, res) {
        Polls.find(function (err, polls) {
            if (err) return res.sendStatus(500);
            res.render('index', {polls: polls});
        });
    }

    // can only add poll if logged in
    this.addPoll = function (req, res) {
        var options = Object.keys(req.body)
            .filter( function(key) {
                return key.startsWith('option');
            })
            .map( function(key) {
                return {
                    name: req.body[key],
                    count: 0
                };
            });
        
        Polls.create({
            name: req.body.question,
            author: req.user.github.id,
            options: options
        }, function(err, poll) {
            if (err) return res.sendStatus(500);
            res.redirect(`/poll/${poll._id}`); 
        });
    }

    this.viewPoll = function(req, res) {
        Polls.findById(req.params.id, function(err, poll) {
            if (err) return res.sendStatus(404);
            res.render('poll', {poll: poll} );
        });
    }

    this.vote = function(req, res) {
        Polls.update( {
            _id: req.params.pollId,
            "options._id": req.params.optionId
        }, {
            $inc: {"options.$.count": 1}
        }, function(err, raw) {
            if (err) return res.sendStatus(500);
            res.redirect(`/poll/${req.params.pollId}`);
        });
    }

    this.addOption = function(req, res) {
        var newOption = {
            name: req.body.optionName,
            count: 1
        };
        
        Polls.update( {
            _id: req.params.id
        }, {
            $push: {
                options: newOption
            }
        }, function(err, raw) {
            if (err) return res.sendStatus(500);
            res.redirect(`/poll/${req.params.id}`);
        });
    }

    this.viewYourPolls = function(req, res) {
        var userId = req.user.github.id;
        var list = [];
        Polls.find( { author: userId } , function(err, data) {
            if (err) return res.sendStatus(500);
            res.render('userpolls', {userpolls: data});
            //res.send(data);
        } );

    }
}


module.exports = pollHandler;

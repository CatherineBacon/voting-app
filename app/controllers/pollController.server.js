'use strict';

var Polls = require('../models/polls.js');

function pollHandler () {

    this.getPolls = function (req, res) {
        Polls.find(function (err, polls) {
            if (err) return res.sendStatus(500);
            res.render('index', {polls: polls});
        });
    }

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
            author: "",
            options: options
        }, function(err, poll) {
            if (err) return res.sendStatus(500);
            res.redirect('/');
        });
    }

    this.viewPoll = function(req, res) {
        Polls.findById(req.params.id, function(err, poll) {
            if (err) return res.sendStatus(404);
            res.send(poll);
        });
    }
    
}

module.exports = pollHandler;

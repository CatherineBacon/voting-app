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
        console.log(req.body);
        Polls.create({
            name: req.body.question,
            author: "",
            options: [{
                name: req.body.option1,
                count: 0
            }]
        }, function(err, poll) {
            if (err) return res.sendStatus(500);
            res.redirect('/');
        });
    }
    
}

module.exports = pollHandler;

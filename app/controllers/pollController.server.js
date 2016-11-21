'use strict';

var Polls = require('../models/polls.js');

function pollHandler () {
    this.getPolls = function (req, res) {
        Polls.find(function (err, polls) {
            if (err) return res.sendStatus(500);
            res.render('index', {polls: polls});
        });
    }
}

module.exports = pollHandler;

'use strict';

var Polls = require('../models/polls.js');
var Users = require('../models/users.js');

function pollHandler () {

  this.getPolls = function (req, res) {
    Polls.find(function (err, polls) {
      if (err) return res.sendStatus(500);
      res.render('index', {
        polls: polls.map(function(poll){
          if(req.user && req.user.github.id == poll.author) {
            poll.isOwn = true;
          } else {
            poll.isOwn = false;
          };
          return poll;
        }),
        isLoggedIn: !!req.user
      });
    });
  }

  // Page view for new poll form
  this.newPoll = function (req, res) {
    res.render('newpoll', {isLoggedIn: !!req.user});
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
      votes: 0,
      options: options
    }, function(err, poll) {
      if (err) return res.sendStatus(500);
      res.redirect(`/poll/${poll._id}`); 
    });
  }

  // can only delete a poll if logged in AND you authored it
  this.deletePoll = function (req, res) {
    var pollId = req.params.id;
    Polls.findById(pollId, function(err, poll) {
      if (err) return res.sendStatus(404);
      if (req.user.github.id != poll.author) return res.sendStatus(401);
      poll.remove();
      res.redirect('/yourpolls');
    });
  }
  
  this.viewPoll = function(req, res) {
    Polls.findById(req.params.id, function(err, poll) {
      if (err) return res.sendStatus(404);
      var url = req.protocol + "://" + req.hostname + req.originalUrl;
      res.render('poll', {
        poll: poll,
        isLoggedIn: req.user ? true : false,
        twittermessage: `Vote for my poll, ${poll.name}: ${url} `
      });
    });
  }

  this.vote = function(req, res) {
    Polls.update( {
      _id: req.params.pollId,
      "options._id": req.params.optionId
    }, {
      $inc: {"options.$.count": 1, "votes": 1},
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
      },
      $inc: {
        "votes": 1
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
      res.render('userpolls', {userpolls: data, isLoggedIn: !!req.user});
      //res.send(data);
    } );

  }
}


module.exports = pollHandler;

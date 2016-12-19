'use strict';

var path = process.cwd();

var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');
var PollHandler = require(path + '/app/controllers/pollController.server.js');

module.exports = function (app, passport) {

  function isLoggedIn (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect('/login');
    }
  }

  var clickHandler = new ClickHandler();
  var pollHandler = new PollHandler();
  
  app.route('/')
    .get(pollHandler.getPolls);

  app.route('/login')
    .get(function (req, res) {
      res.sendFile(path + '/public/login.html');
    });

  app.route('/logout')
    .get(function (req, res) {
      req.logout();
      res.redirect('/');
    });

  app.route('/profile')
    .get(isLoggedIn, function (req, res) {
      res.sendFile(path + '/public/profile.html');
    });

  app.route('/api/:id')
    .get(isLoggedIn, function (req, res) {
      res.json(req.user.github);
    });

  app.route('/auth/github')
    .get(passport.authenticate('github'));

  app.route('/auth/github/callback')
    .get(passport.authenticate('github', {
      successRedirect: '/',
      failureRedirect: '/login'
    }));
  
  // change the route below and also add route for /newpoll
  app.route('/api/:id/clicks')
    .get(isLoggedIn, clickHandler.getClicks)
    .post(isLoggedIn, clickHandler.addClick)
    .delete(isLoggedIn, clickHandler.resetClicks);
  
  // add isLoggedIn below, to post and get as above
  app.route('/newpoll')
    .get(isLoggedIn, pollHandler.newPoll)
    .post(isLoggedIn, pollHandler.addPoll);

  //should only be able to add option if logged in
  app.route('/poll/:id')
    .get(pollHandler.viewPoll)
    .post(isLoggedIn, pollHandler.addOption);
  
  app.route('/poll/:pollId/vote/:optionId')
    .get(pollHandler.vote);

  app.route('/yourpolls')
    .get(isLoggedIn, pollHandler.viewYourPolls);

  app.route('/poll/:id/delete')
    .get(isLoggedIn, pollHandler.deletePoll);
};

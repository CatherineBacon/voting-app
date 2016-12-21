'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Poll = new Schema ({
  name: String,
  author: String,
  votes: Number,
  options: [{
    name: String,
    count: Number
  }]
});

module.exports = mongoose.model('Poll', Poll);

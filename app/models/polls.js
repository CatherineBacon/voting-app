'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Poll = new Schema ({
    poll: {
        name: String,
        author: String,
        options: [{
            name: String,
            count: Number
        }]
    }
});

module.exports = mongoose.model('Poll', Poll);
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Poll = require('./poll');

var schema = new Schema({
  displayName: {type: String, required: true},
  userName: {type: String, required: true},
  polls: [{type: Schema.Types.ObjectId, ref: 'Poll'}]
})

module.exports = mongoose.model('User', schema);

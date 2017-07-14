var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = require('./user')

var schema = new Schema({
  title: {type: String, required: true},
  options: {type: Array, required: true},
  creator: {type: Schema.Types.ObjectId, ref: 'User'},
  votes: {type: Array},
  voters: {type: Array}
})

module.exports = mongoose.model('Poll', schema);

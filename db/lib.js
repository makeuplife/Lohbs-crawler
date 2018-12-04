var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var lohbsSchema = require('./modal');

module.exports = mongoose.model('Lohbs', lohbsSchema);

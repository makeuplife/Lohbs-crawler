var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var oliveYoungSchema = require('./modal');

module.exports = mongoose.model('OliveYoung', oliveYoungSchema);

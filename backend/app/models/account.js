// app/models/account.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var AccountSchema   = new Schema({
    username: String,
    password: String,
    isActive: Boolean,
    secretToken: String,
});

module.exports = mongoose.model('Account', AccountSchema);
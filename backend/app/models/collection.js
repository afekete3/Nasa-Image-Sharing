var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var CollectionSchema   = new Schema({
    username: String,
    name: String,
    desc: String,
    Collection: Array,
    ispublic: Boolean,
    rank: Number,
    
});

module.exports = mongoose.model('Collection', CollectionSchema);
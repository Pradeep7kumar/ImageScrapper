var mongoose = require('mongoose');


var schema = new mongoose.Schema({
user_id : String,
keyword : []

});

mongoose.model('img',schema);
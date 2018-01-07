var mongoose = require('mongoose');

var ScraperSchema = new mongoose.Schema({

    userid: String,
    keyword: [{keyword: String}]
});

mongoose.model('scraperschema',ScraperSchema);
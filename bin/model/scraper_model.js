var mongoose = require('mongoose');

var ScraperSchema = new mongoose.Schema({

    userid: Number,
    keyword: []
});

mongoose.model('scraperschema',ScraperSchema);
var express = require('express');
var router = express.Router();
var http = require("http");
var cheerio = require("cheerio");
var fs = require('fs');
var url = require('url');
var request = require('request');
path = require('path')
const Jimp = require("jimp");
var mongoose = require('mongoose');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('scrapper.html');
});



mongoose.connect('mongodb://127.0.0.1:27017/testing');


mongoose.model('img').create(
     {'user_id' : 'user'},function(err,status){
     }
);


router.get('/',function(req, res)
{ 


    var Scraper = require ('images-scraper'),
    urls = [],
    google = new Scraper.Google();
    var text;

    var src;
    var count = 0;
    // you can also watch on events
    google.on('result', function (item) {
    console.log('out', item);
    });


    var txt = req.query.kw;
   console.log(txt[1]);

    
    mongoose.model('img').update({'user_id':'user'},{
        '$push' : {
            'keyword' : txt[1]
        }
    },function(err,x){
        console.log(err);
        console.log(x);
    });
   
    //res.json('ok');

    
     mongoose.model('img').findOne({'user_id': 'user'},function(err,resource){

        if(err)
        res.json({error: "Erorr fetching"});
        else
        res.json("" + resource.keyword);
        
    })
    



    google.list({
        keyword: txt[1],
        num: 15,
        detail: true,
        nightmare: {
            show: true
        }
    })
        .then(function (res) {
            for(let url in res){

                Jimp.read(res[url].url).then(function (lenna) {
                    lenna.resize(500, 500)             //resize
                        .quality(100)                 //compress quality
                          .greyscale()                 //black and white
                        .write("public//images/"+txt[1]+ "_" + count+".jpg");   // save images
                    count++ ;
                    }).catch(function (err) {
                    console.error(err);
                  });

            }

        }).catch(function(err) {
        console.log('err', err);
    });

});

router.post('/',function(req, res){
    console.log('Ab aa rha h ');        //just a check-point:-)             
    mongoose.model('img').findOne({'user_id': 'user'},function(err,resource){	

        if(err)
        res.json({error: "Erorr fetching"});
        else
        res.json("" + resource.keyword);
        
    })


});




module.exports= router;
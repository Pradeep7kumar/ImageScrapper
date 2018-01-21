var express = require('express');
var router = express.Router();
//var cheerio = require("cheerio");
var fs = require('fs');
const Jimp = require("jimp");
var mongoose = require('mongoose');
var Scraper = require('images-scraper');


/* GET home page. */
router.get('/index', function(req, res, next) {

    fs.readFile('./views/scrapper.html',function(err, data)
    {if(err) throw err;
        else{
            res.writeHead(200,{'Content-Type': 'text/html'});
            res.end(data);
        }

    });
  });
  


  router.get('/keywords.html', function(req, res, next) {

    fs.readFile('./views/keywords.html',function(err, data)
    {if(err) throw err;
        else{
            res.writeHead(200,{'Content-Type': 'text/html'});
            res.end(data);
        }

    });
  });

  router.get('/photos.html', function(req, res, next) {

    fs.readFile('./views/photos.html',function(err, data)
    {if(err) throw err;
        else{
            res.writeHead(200,{'Content-Type': 'text/html'});
            res.end(data);
        }

    });
  });



//mongoose.connect('mongodb://127.0.0.1:27017/testing');
//mongoose.connect('mongodb://mgupta133:mohit110001@ds249737.mlab.com:49737/imgdbscraper');


mongoose.model('img').create(
     {'user_id' : 'mohit'},function(err,status){
     }
);


router.get('/',function(req, res)
{ 


    //var Scraper = require ('images-scraper');
	//pkcs11
    var urls = [];
    console.log(new Scraper.Google());
    var google = new Scraper.Google();
    var count = 0;
    // you can also watch on events



    var txt = req.query.kw;
   console.log(txt);

    
    mongoose.model('img').update({'user_id':'mohit'},{
        '$push' : {
            'keyword' : txt
         }
    },function(err,x){
        console.log(err);
        console.log(x);
    });
   
    //res.json('ok');

    console.log("google");
    console.log(google);
	console.log(google.list);
	console.log(Scraper);

	var options = {
        keyword: txt,
        num: 15,
        detail: true,
        nightmare: {
            show: true
        }
    };

	google.list(options,function(err,res){
	    console.log("hi");

	    console.log(err);
	    console.log(res);

    });


    google.list({
        keyword: txt,
        num: 15,
        detail: true,
        nightmare: {
            show: true
        }
    })
        .then(function (res) {
            console.log("response");
			console.log(res);
            for(var url in res){
				console.log("x"+url);	
                Jimp.read(res[url].url).then(function (lenna) {
                    lenna.resize(500, 500)            
                        .quality(100)                 
                          .greyscale()                 
                        .write("../images/"+txt+ "" + count+".jpg"); 
                        
                        count++ ;
                        console.log(count+" image downloaded");
                    }).catch(function (err) {
                    console.error(err);
                  });

            }

        }).catch(function(err) {
        console.log('err');
    });
	
	 console.log("a google");

    google.on('result', function (err,item) {
        console.log('out'+ item);
    });
	
	
	
	
	mongoose.model('img').findOne({'user_id': 'mohit'},function(err,resource){

        if(err)
        res.json({error: "Erorr fetching"});
        else
        res.json("" + resource.keyword);
        
    });

});


router.get('/images/*',function(req,res){
    var paths = req.path.toString().substr(1);
    console.log(paths);
	//res.json(paths);
    fs.readFile("../"+ paths, function (err, data) {
        if (err) throw err; // Fail if the file can't be read.
        else {
            res.writeHead(200, {'Content-Type': 'image/jpg'});
           res.end(data);// Send the file data to the browser.

        }
    });

});







router.post('/',function(req, res){
    console.log('Ab aa rha ');
    mongoose.model('img').findOne({'user_id': 'mohit'},function(err,resource){

        if(err)
        res.json({error: "Erorr fetching"});
        else
        res.json("" + resource.keyword);
        
    })


});





module.exports= router;
var express = require('express');   
var path = require('path');
var app = express();
var fs=require('fs');
var bodyParser = require('body-parser');
//Port of web or 8080 in localHOST
var PORT = process.env.PORT || 8080
//Used to parse data on POST
var urlEncodedParser = bodyParser.urlencoded({extended:false});
//Use public directory as /static in server
app.use('/static', express.static('public'));

//Default of the website go to Home page
app.get('/', function (req, res) {
    return res.send("yuda");
})
app.listen(PORT, () => console.log(`Listening on ${ PORT }`)); 


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
app.use('/static', express.static('FILES'));
//Default of the website go to Home page
app.get('/', function (req, res) {
    return res.send("Yossi Dabush is the most wonderful person alive");
})
app.get('/sign-in', function (req, res) {
    res.sendFile(path.join(__dirname, '/FILES/signInPage.html'));
})
app.get('/dashboard', function (req, res) {
    res.sendFile(path.join(__dirname, '/FILES/dashboard.html'));
})
app.get('/users', function (req, res) {
    res.sendFile(path.join(__dirname, '/FILES/users.html'));
})







app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '/FILES/404.html'));
})
app.listen(PORT, () => console.log(`Listening on ${ PORT }`)); 

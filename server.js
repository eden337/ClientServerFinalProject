var express = require('express');   
var path = require('path');
var app = express();
var fs=require('fs');
const { Client } = require('pg');

var bodyParser = require('body-parser');
//Port of web or 8080 in localHOST
var PORT = process.env.PORT || 8080
//Used to parse data on POST
var urlEncodedParser = bodyParser.urlencoded({extended:false});
//Use public directory as /static in server
app.use('/static', express.static('./'));

/*-----START-----
client representing the website to declare and connect as  a client to the postgresql database
*/
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });
  client.connect();
  /*-----END-----*/


//Default of the website go to Home page
app.get('/', function (req, res) {
    return res.redirect("/sign-in");
})

app.get('/sign-in', function (req, res) {
    res.sendFile(path.join(__dirname, '/html/signInPage.html'));
})
app.get('/dashboard', function (req, res) {
    res.sendFile(path.join(__dirname, '/html/dashboard.html'));
})
app.get('/users', function (req, res) {
    res.sendFile(path.join(__dirname, '/html/users.html'));
})

app.get('/new_insurance', function (req, res) {
    res.sendFile(path.join(__dirname, '/html/insurance_details.html'));
})
app.get('/test', function (req, res) {
    client.query("select * from users;",function(err,data){
        res.json(JSON.parse(data));
    })
})
app.get('/yuda', function (req, res) {
    res.sendFile(path.join(__dirname, '/test.html'));
})


app.get('/calculate', function (req, res) {
    var data = fs.readFileSync('IsraelIsraeli.json')
    var severity="";
    const UTF8_BOM = "\u{FEFF}";                    
    if( data.includes(UTF8_BOM)){
        data.subarray(1);
    }
    var jsonContent =JSON.parse(data);
    //res.append("eden","yuda");
    switch(jsonContent.UserRank){
        case "1":
            res.append("eden","yuda1");
            break;
        case "2":
            res.append("eden","yuda2");
            break;
        case "3":
            res.append("eden","yuda3");
            break;
        case "4":
            res.append("eden","yuda4");
            break;
    }
    console.log(jsonContent.UserRank +" "+ res.get("eden"));
})

app.post('/send-request',urlEncodedParser,function(req,res){
    res.send(req.body);
})

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '/html/404.html'));
})
app.listen(PORT, () => console.log(`Listening on ${ PORT }`)); 

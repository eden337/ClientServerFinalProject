var express = require('express');   
var path = require('path');
var app = express();
var fs=require('fs');
/*ONLINE DB*/
const { Client } = require('pg');
/*LOCAL DB*/
let mysql = require('mysql');

var bodyParser = require('body-parser');
//Port of web or 8080 in localHOST
var PORT = process.env.PORT || 8080
//Used to parse data on POST
var urlEncodedParser = bodyParser.urlencoded({extended:false});
//Use public directory as /static in server
app.use('/static', express.static('./'));

/*-----START----- postgres
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
  /*-----START----- mysql local*/
//   let connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'Yh321789654',
//     database: 'todoapp'
// });
//     connection.connect(function(err) {
//         if (err) {
//             return console.error('error: ' + err.message);
//         }
  
//     console.log('Connected to the MySQL server.');
//   });
  /*-----END-----*/


//Default of the website go to Home page
app.get('/', function (req, res) {
    return res.redirect("/sign-in");
})

app.get('/sign-in',function (req, res) {
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
app.get('/thankyou',function(req,res){
    res.sendFile(path.join(__dirname, '/html/thankyou.html'));
})
app.post('/send-request',urlEncodedParser,function(req,res){
    var social=req.body.social_num2;
    var name=req.body.fname2+" "+req.body.lname2;
    var email=req.body.email2;
    var mobile=req.body.mob2;
    var ins_amount=req.body.ins_amount2;
    var pre_ins_num=req.body.pre_ins_num2;
    var pre_ins_id=req.body.pre_ins_id2;
    var pre_ins_comp=req.body.pre_ins_comp2;
    var comment=req.body.comment2;
    console.log(req.body);
    connection.query("insert into requests (client_name,social,email,phone,insurance_amount,previous_insurance_number,previous_insurance_id,previous_insurance_company,comment)"+
    " values"+" ('"+name+"','"+social+"','"+email+"','"+mobile+"','"+ins_amount+"','"+pre_ins_num+"','"+pre_ins_id+"','"+pre_ins_comp+"','"+comment+"')",function(err,result){
        if(err){
            console.error("error:"+err.message);
        }
        res.send('/thankyou');
    });
    
})
app.post('/DB-login',urlEncodedParser,function(req,res){
    var user=req.body.email;
    var pass=req.body.pass;
    // connection.query("select * from users;",function(err,data){
        client.query("select * from users;",function(err,data){
        if(user==data[0].name && pass==data[0].password){
            res.send("/dashboard");
        }
        else
            res.send("not ok");
    });
})
app.get('/test', function (req, res) {
    connection.query("select * from users;",function(err,data){
        console.log(data[0]);
        res.json(data[0]);
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



app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '/html/404.html'));
})
app.listen(PORT, () => console.log(`Listening on ${ PORT }`)); 

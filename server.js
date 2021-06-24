var express = require('express');   
var path = require('path');
var app = express();
var fs=require('fs');
/*ONLINE DB*/
const { Client } = require('pg');
/*LOCAL DB*/
let mysql = require('mysql');

var bodyParser = require('body-parser');
const { randomInt } = require('crypto');
//Port of web or 8080 in localHOST
var PORT = process.env.PORT || 8080
//Used to parse data on POST
var urlEncodedParser = bodyParser.urlencoded({extended:false});
//Use public directory as /static in server
app.use('/static', express.static('./'));

/*-----START----- postgres online
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

  /*-----START----- postgres local*/
//   const client =new Client ({
//     host: 'localhost', // server name or IP address;
//     port: 5432,
//     database: 'postgres',
//     user: 'postgres',
//     password: 'Yh321789654'
// });
// client.connect(function(err,result){
//     console.log("Connected to db");
// });
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
/*  Finished working in local
    Need to check online*/
app.post('/send-request',urlEncodedParser,function(req,res){
    var request_id=randomInt(1,10000);
    var social=req.body.social_num2;
    var name=req.body.fname2+" "+req.body.lname2;
    var email=req.body.email2;
    var mobile=req.body.mob2;
    var ins_amount=req.body.ins_amount2;
    var pre_ins_num=req.body.pre_ins_num2;
    var pre_ins_id=req.body.pre_ins_id2;
    var pre_ins_comp=req.body.pre_ins_comp2;
    var comment=req.body.comment2;
    client.query("insert into requests (request_id, client_name,social,email,phone,insurance_amount,previous_insurance_number,previous_insurance_id,previous_insurance_company,comment)"+
    " values"+" ('"+request_id+"',"+"'"+name+"','"+social+"','"+email+"','"+mobile+"','"+ins_amount+"$','"+pre_ins_num+"','"+pre_ins_id+"','"+pre_ins_comp+"','"+comment+"')",function(err,result){
        res.send('/thankyou');
    });
    
})
/*  Finished working in local
    Need to check online*/
app.post('/DB-login',urlEncodedParser,function(req,res){
    var user=req.body.email;
    var pass=req.body.pass;
        client.query("select * from users;",function(err,data){
            for(var i=0;i<data.rows.length;i++)
                if(user===data.rows[i].name && pass===data.rows[i].password){
                    return res.send("/dashboard");
                }
            res.send("not ok")
    });
})

/*  Need working in local
    Need to check online*/
app.post('/calculate', function (req, res) {
    var name=req.body.name;
    var amount=req.body.amount;
    console.log(name);
    var data = fs.readFileSync(name+".json");
    var severity="";
    const UTF8_BOM = "\u{FEFF}";                    
    if( data.includes(UTF8_BOM)){
        data.subarray(1);
    }
    var jsonContent =JSON.parse(data);
    // //res.append("eden","yuda");
    // switch(jsonContent.UserRank){
    //     case "1":
    //         res.append("eden","yuda1");
    //         break;
    //     case "2":
    //         res.append("eden","yuda2");
    //         break;
    //     case "3":
    //         res.append("eden","yuda3");
    //         break;
    //     case "4":
    //         res.append("eden","yuda4");
    //         break;
    // }
    // console.log(jsonContent.UserRank +" "+ res.get("eden"));
    return res.json(jsonContent);
})

app.get('/dashboardTable',function(req,res){
    client.query("select client_name,insurance_amount,severity,category,status,due_date from requests;",function(err,data){
        return res.json(data.rows);
    })
})

app.get('/usersTable',function(req,res){
    client.query("select FirstName, LastName, insuranceType, insuranceAmountRequested, insuranceCompanyName, CarSatus, UserRank from requests;",function(err,data){
        return res.json(data.rows);
    })
})


app.post('/test',urlEncodedParser, function (req, res) {
    var clientName=req.body.clientName;
    var amount=req.body.amount;
    var severity;
    var userData = fs.readFileSync(clientName+".json");
    const UTF8_BOM = "\u{FEFF}";                    
    if( userData.includes(UTF8_BOM)){
        userData.subarray(1);
    }
    var userJsonContent =JSON.parse(userData);

    var policyData = fs.readFileSync("./json/Policy.json");                  
    if( policyData.includes(UTF8_BOM)){
        policyData.subarray(1);
    }
    var policyJsonContent =JSON.parse(policyData);
    var txt="";
    for(i in policyJsonContent){
        // txt+=jsonContent[i][0].UserRank;
        if(policyJsonContent[i][0].UserRank==userJsonContent.UserRank){
            var id=userJsonContent.insuranceData[0].PrevinsuranceID;
            severity=i;
            client.query("UPDATE requests SET severity="+severity+" status='Reviewed' category='Car_Insurance' due_date='1/9/2021' where previous_insurance_id="+id+"");
        }
       
            
    }
   
    console.log(severity);
    return res.json(userJsonContent);
})
app.get('/yuda',urlEncodedParser, function (req, res) {
    var data = fs.readFileSync("./json/MosheCohen.json");
    const UTF8_BOM = "\u{FEFF}";                    
    if( data.includes(UTF8_BOM)){
        data.subarray(1);
    }
    var jsonContent =JSON.parse(data);
    var txt="";
    // for(i in jsonContent){
    //     // txt+=jsonContent[i][0].UserRank;
    //     if(jsonContent[i][0].UserRank==4)
    //         txt="yuidad";
    // }
    txt=jsonContent.insuranceData[0].companyUserId;
        
    res.json(txt);
})






app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '/html/404.html'));
})
app.listen(PORT, () => console.log(`Listening on ${ PORT }`)); 

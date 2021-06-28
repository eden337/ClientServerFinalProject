var express = require('express');   
var path = require('path');
var app = express();
var fs=require('fs');

var crypto=require('crypto');
var md5sum=crypto.createHash('md5');
var hash=md5sum.update('1234').digest('hex');

/*ONLINE DB*/
const { Client } = require('pg');

var bodyParser = require('body-parser');
const { randomInt } = require('crypto');
const { response } = require('express');
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
//     password: 'Spidy_@337'
// });
client.connect(function(err,result){
    console.log("Connected to db");
});
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
});

app.post('/send-request',urlEncodedParser,function(req,res){
    var request_id=randomInt(1,10000);
    client.query("select * from requests where request_id ='"+request_id+"'",function(err,data){
        if(err){
            throw err;
        }
        if(data!==null){
            request_id=randomInt(1,10000);
        }
    });
    var social=req.body.social_num2;
    var name=req.body.fname2+" "+req.body.lname2;
    var email=req.body.email2;
    var mobile=req.body.mobile2;
    var ins_amount=req.body.ins_amount2;
    var pre_ins_num=req.body.pre_ins_num2;
    var pre_ins_id=req.body.pre_ins_id2;
    var pre_ins_comp=req.body.pre_ins_comp2;
    var comment=req.body.comment2;
    var userRank = randomInt(1,5);
    var user={};
    var sql ="insert into requests (request_id, client_name,social,email,phone,insurance_amount,previous_insurance_number,previous_insurance_id,previous_insurance_company,comment,category, companyUserId, prevrequestnumber, insuranceenable,dateofenblment,userrank,message,insurancecompanyfee) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18)";
    const path ='./json/'+req.body.fname2+req.body.lname2+'.json';
    
    if(fs.existsSync(path)){
        fs.readFile(path, 'utf8', (err, jsonString) => {
            if (err) {
                console.log("Error reading file from disk:", err);
                return;
            }
            try {
                user = JSON.parse(jsonString);
                var values=[request_id, name, social, email,mobile,user.insuranceAmountRequested+"$",user.insuranceData[0].Previousinsurancenumber,user.insuranceData[0].PrevinsuranceID,user.insuranceData[0].PrevinsuranceCompanyName,user.comment,user.insuranceType, ""+user.insuranceCompanyName+"", user.insuranceData[0].RequestNumber,user.insuranceEnable,user.dateofEnblment,user.UserRank,user.message,user.insuranceData[0].insuranceCompanyfee];
                
                client.query(sql,values,function(err,res){
                if(err){
                    throw err;
                }
                });
                
        } catch(error) {
                console.log('Error parsing JSON string:', error);
            }
        });
    }
    else{
            user={
            "insuranceType": "CarInsurance",
            "FirstName": req.body.fname2,
            "LastName": req.body.lname2,
            "insuranceAmountRequested": ins_amount,
            "insuranceCompanyName": "Harel",
            "insuranceData": [
            {
                "companyUserId": 123,
                "PrevinsuranceCompanyName": pre_ins_comp,
                "RequestNumber": 5578,
                "Previousinsurancenumber": pre_ins_num,        
                "PrevinsuranceID": pre_ins_id,
                "insuranceCompanyfee": "10"
            }
            
        ],
            "insuranceEnable": 1, 
            "dateofEnblment": 10042022,
            "CarStatus": "accident",
            "UserRank": ""+userRank+"" ,
            "comment": comment,
            "message": "accident with car Golf in Tel Aviv"
        };

        fs.writeFile("./json/"+req.body.fname2+req.body.lname2+".json",JSON.stringify(user,null,2),function(err,res){
            if(err)
            {
                throw err;
                
            }
        });
  
        var values=[request_id, name, social, email,mobile,ins_amount+"$",pre_ins_num,pre_ins_id,pre_ins_comp,comment,user.insuranceType, ""+user.insuranceCompanyName+"", user.insuranceData[0].RequestNumber,user.insuranceEnable,user.dateofEnblment,user.UserRank,user.message,user.insuranceData[0].insuranceCompanyfee];
        client.query(sql,values,function(err,res){
        if(err){
            throw err;
        }
        });
    }
    res.send('/thankyou');
    
});

app.post('/DB-login',urlEncodedParser,function(req,res){
    var user=req.body.email;
    var pass=req.body.pass;
        client.query("select * from users;",function(err,data){
            if(err){
                throw err;
            }
            for(var i=0;i<data.rows.length;i++)
                if(user===data.rows[i].name && hash===data.rows[i].password){
                    return res.send("/dashboard");
                }
            res.send("not ok");
    });
})



app.get('/piechart',function(req,res){
    var low =0;
    var medium=0;
    var high = 0;
    var sever=0;
    var numOfRequests=0;
    client.query("select client_name,insurance_amount,severity,category,status,due_date from requests;",function(err,data){
        if(err){throw err;}
        for(var i=0;i<data.rowCount;i++){
            switch(data.rows[i].severity){
                case 'Low':
                    low++;
                    numOfRequests++;
                    break;
                case 'Mid':
                    medium++;
                    numOfRequests++;
                    break;
                case 'High':
                    high++;
                    numOfRequests++;
                    break;
                case 'Severe':
                    sever++;
                    numOfRequests++;
                    break;
                default:
                    break;
            }
        }
        var chartData=[];
        if(numOfRequests!==0)
            chartData = [(low/numOfRequests)*100,(medium/numOfRequests)*100,(high/numOfRequests)*100,(sever/numOfRequests)*100];

        var charDataObject = {'low': chartData[0],'medium': chartData[1],'high': chartData[2],'sever': chartData[3]};
        return res.json(charDataObject);
    });
});

app.get('/dashboardTable',function(req,res){
    var low =0;
    var medium=0;
    var high = 0;
    var sever=0;
    var numOfRequests=0;
    client.query("select client_name,insurance_amount,severity,category,status,due_date from requests;",function(err,data){
        if(err){throw err;}
        for(var i=0;i<data.rowCount;i++){
            var badgeColor = 'light';
            switch(data.rows[i].severity){
                case 'Low':
                    low++;
                    numOfRequests++;
                    badgeColor='success';
                    break;
                case 'Mid':
                    medium++;
                    numOfRequests++;
                    badgeColor='secondary';
                    break;
                case 'High':
                    high++;
                    numOfRequests++;
                    badgeColor='warning';
                    break;
                case 'Severe':
                    sever++;
                    numOfRequests++;
                    badgeColor='danger';
                    break;
                default:

                    badgeColor='light';
                    break;
            }
            data.rows[i].severity = "<span class='badge badge-pill badge-"+badgeColor+"';>"+data.rows[i].severity+"</span>";
        }
        if(numOfRequests!==0)
        var chartData = [(low/numOfRequests)*100,(medium/numOfRequests)*100,(high/numOfRequests)*100,(sever/numOfRequests)*100];
        return res.json(data.rows);
    });
});



app.post('/client-Info',urlEncodedParser, function (req, res){
    var name = req.body.clientName;
    console.log(name);
    client.query("SELECT * from requests where client_name='"+name+"'",function(err,data){
        if(err){
            throw err;
        }
        return res.json(data.rows);
    });
});

app.get('/usersTable',function(req,res){
    client.query("select client_name, category, insurance_amount, previous_insurance_company, status from requests;",function(err,data){
        if(err)
            throw err;
        return res.json(data.rows);
    });
});


app.post('/calculate',urlEncodedParser, function (req, res) {
    var clientName=req.body.clientName;
    clientName =clientName.replace(/\s+/g,'').trim();
    var severity;
    var userData = fs.readFileSync("./json/"+clientName+".json");
    var id;
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
    for(i in policyJsonContent){
        if(policyJsonContent[i][0].UserRank==userJsonContent.UserRank){
            id=userJsonContent.insuranceData[0].PrevinsuranceID;
            severity=i;
            client.query("UPDATE requests SET severity='"+severity+"',category='Car Insurance',status='Reviewed',due_date='1/9/2021' where previous_insurance_id='"+id+"'",function(err,res){
                if(err){
                    throw err;
                }
            });
        }
    }
    client.query("SELECT * from requests where previous_insurance_id='"+id+"'",function(err,data){
        if(err){throw err;}
        return res.json(data.rows);
    });
});


app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '/html/404.html'));
});
app.listen(PORT, () => console.log(`Listening on ${ PORT }`)); 

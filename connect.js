let mysql = require('mysql');
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Yh321789654',
    database: 'todoapp'
});
connection.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
  
    console.log('Connected to the MySQL server.');
  });

// connection.query("insert into users(name) values('yuda');"); 
console.log(connection.query("select * from users;").rows);

connection.end(function(err){
    console.log("end");
});
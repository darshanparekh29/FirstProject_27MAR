var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "#Dsg29042003",
  database: "USER_20MAR",
  dateStrings:true
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

  
module.exports={con};
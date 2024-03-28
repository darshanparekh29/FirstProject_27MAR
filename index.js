var express = require("express");

var app = express();
var {router} = require ("./router");
app.set("view engine","ejs");
app.use(express.static(__dirname+'/views'));
app.use(express.urlencoded({extended:true}));

const cookie = require("cookie-parser");

app.use(cookie());

const PORT = 8081;

app.listen(PORT,(err)=>{
    try{
        app.use(router);
        console.log("The server is Running on PORT number :"+PORT);
    }
    catch(e){
        console.log(e);
    }
});
var express = require("express");
var router = express.Router();
//var middelware = require("./formValidator");
var con = require("./connection");
var app = express();
//var md5 = require('md5');

router.get("/", (req, res) => {
    res.render("index.ejs");
})
router.get("/task",(req,res)=>{
    var taskName = req.query.taskName;
    var filter = req.query.filter || undefined;

    if(taskName=="DynamicTable"){
        res.render("task/DynamicTable.ejs");
    }
    else if(taskName=="kukuCube"){
        res.render("task/cucuCube.ejs");
    }
    else if(taskName=="jsEvent"){
        res.render("task/JSEventListener.ejs");
    }
    else if(taskName=="tictac"){
        res.render("task/ticToe.ejs");
    }
    else if(taskName=="sort"){
        res.render("task/sort.ejs");
    }
    else if(taskName=="PaginationWithOrderBy" || filter!=undefined){
        var array1 = [];
        var array2 = [];
        var sql1 = "DESCRIBE student_master;";
    
        var page = req.query.page || 1;
        let a=req.query.filter || "student_id";
        let offset =(page-1)*20;
        var studentData=`SELECT * FROM student_master ORDER BY ${a} LIMIT 20 OFFSET ${offset} `;

        con.con.query(sql1, function (err, result, fields) {
            if (err) throw err;
            array1 = result;
    
            con.con.query(studentData, function (err, result, fields) {
                if (err) throw err;
                array2 = result;
                // console.log(array2);
                res.render("task/pagWithOrder.ejs", { data1: array1, data2: array2,page,a});
            })
        });
    }
})
/*
router.post("/taskPageExer1",(req,res)=>{
    var array1 = [];
    var array2 = [];
    var sql1 = "DESCRIBE student_master;";

    var page = req.query.page || 1;
    let a=req.query.filter || "student_id";
    let offset =(page-1)*20;
    var studentData=`SELECT * FROM student_master ORDER BY ${a} LIMIT 20 OFFSET ${offset} `;

    con.con.query(sql1, function (err, result, fields) {
        if (err) throw err;
        array1 = result;

        con.con.query(studentData, function (err, result, fields) {
            if (err) throw err;
            array2 = result;
            // console.log(array2);
            res.render("task/pagWithOrder.ejs", { data1: array1, data2: array2,page,a});
        })
    });

})*/
module.exports = { router };
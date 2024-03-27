var express = require("express");
var router = express.Router();
//var middelware = require("./formValidator");
var con = require("./connection");
var fs = require("fs");
var app = express();
//var md5 = require('md5');

router.get("/", (req, res) => {
    res.render("index.ejs");
})


router.get("/task",(req,res)=>{

function StoreQuery(sql){
   // console.log("Hellodsa!");
    fs.writeFile("file1MARCH.txt",(sql),
        err=>{
            if(err) throw err;
            console.log("query in Json Inserted!");
        });
}
function checkPages(dataLength){
    var a;
    if(dataLength%15==0){
        a=dataLength/15;   
        return a;
    }
    else{
        a=(dataLength/15)+1;
        return Math.floor(a);
    }
}
function lastPageValues(dataLength){
    var b;
    if(dataLength%15==0){
        b=15;
        return b;
    }
    else{
        a=(dataLength/15)+1;
        b=5;
        return b;
    }
}

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
    else if(taskName=="PaginationWithFilter"){
       // console.log("Hello!");
        var secondP = req.query.secondP || 0;
        var sort = req.query.sort || 0;
        var orderBy = req.query.orderBy ||  'exam_id';
       // console.log(orderBy);
        var order = req.query.order || "ASC";
        if(secondP==1){
            //console.log("Hello!2");
            try{
                var sql1 = req.query.query;
                var parms = req.query.parms || 2;
                if(parms==1){      
                   
                    var page=req.query.page || 1;
                    var offset=(page-1)*15;
                 
                    con.con.query(sql1,function(err,result1){
                        if(err){
                            // res.status(404).send("You enterd Wrong Query!");
                            console.log(err);
                        };
                        var dataLength=result1.length;
                        var requirePages= checkPages(dataLength);
                        totalPages=15;
                        if(page==requirePages){
                            totalPages=lastPageValues(dataLength)
                        }
                        fs.readFile("file1MARCH.txt", function(err, data) {
                                
                                sql2=data.toString()+` order by ${orderBy} ${order} LIMIT ${totalPages} OFFSET ${offset};`;
                            con.con.query(sql2,function(err,result,fields){
                                // if(err)  throw err;
                                res.render("pagginationWithFilter/detailList.ejs",{data1:result,data2:fields,page,requirePages,sql1,order,orderBy});                    
                            });            
                          });            
                    });
                }else{
                 //  console.log("Heljnxflo");
                    StoreQuery(sql1);
                var page=req.query.page || 1;
                var offset=(page-1)*15;
             //   var orderBy = req.query.orderBy || "exam_id";
                con.con.query(sql1,function(err,result1){
                    if(err){
                        // res.status(404).send("You enterd Wrong Query!");
                        console.log(err);
                    };
                    var dataLength=result1.length;
                    var requirePages= checkPages(dataLength);
                    fs.readFile("file1MARCH.txt", function(err, data) {
                        
                            sql2=data.toString()+` order by ${orderBy} ${order} LIMIT 15 OFFSET ${offset};`;
                        con.con.query(sql2,function(err,result,fields){   
                            // if(err) throw err;           
                            res.render("pagginationWithFilter/detailList.ejs",{data1:result,data2:fields,page,requirePages,sql1,order,orderBy});       
                        });             
                      });           
                });
    
                }      
                  
            }
            catch(err){
                res.status(404).send("You enterd Wrong Query!");
            }
        }
        else{
            res.render("/home/darshan-parekh/Desktop/FirstProject/FirstProject_27MAR/views/pagginationWithFilter/index.ejs");
        }
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
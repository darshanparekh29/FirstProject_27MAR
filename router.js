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


router.get("/task", (req, res) => {

function StoreQuery(sql){
    fs.writeFile("file.txt",(sql),
        err=>{
            if(err) throw err;
            console.log("query in Json Inserted!");
        });
}
function checkResults(dataLength){
    if(dataLength==0){
        return true;
    }
    else{
        return false;
    }
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

    if (taskName == "DynamicTable") {
        res.render("task/DynamicTable.ejs");
    }
    else if (taskName == "kukuCube") {
        res.render("task/cucuCube.ejs");
    }
    else if (taskName == "jsEvent") {
        res.render("task/JSEventListener.ejs");
    }
    else if (taskName == "tictac") {
        res.render("task/ticToe.ejs");
    }
    else if (taskName == "sort") {
        res.render("task/sort.ejs");
    }
    else if (taskName == "PaginationWithOrderBy" || filter != undefined) {
        var array1 = [];
        var array2 = [];
        var sql1 = "DESCRIBE student_master;";

        var page = req.query.page || 1;
        let a = req.query.filter || "student_id";
        let offset = (page - 1) * 20;
        var studentData = `SELECT * FROM student_master ORDER BY ${a} LIMIT 20 OFFSET ${offset} `;

        con.con.query(sql1, function (err, result, fields) {
            if (err) throw err;
            array1 = result;

            con.con.query(studentData, function (err, result, fields) {
                if (err) throw err;
                array2 = result;
                // console.log(array2);
                res.render("task/pagWithOrder.ejs", { data1: array1, data2: array2, page, a });
            })
        });
    }
    else if (taskName == "PaginationWithFilter") {
        // console.log("Hello!");
        var secondP = req.query.secondP || 0;
        var sort = req.query.sort || 0;
        var orderBy = req.query.orderBy || 'exam_id';
        // console.log(orderBy);
        var order = req.query.order || "ASC";
        if (secondP == 1) {
          //  console.log("Hello!2");
            try {
                var sql1 = req.query.query;
               // console.log("sql1 "+sql1);
                var parms = req.query.parms || 2;
                if (parms == 1) {

                    var page = req.query.page || 1;
                    var offset = (page - 1) * 15;
                    console.log("sql1 "+sql1);
                    con.con.query(sql1, function (err, result1) {
                        if (err) {
                            // res.status(404).send("You enterd Wrong Query!");
                            console.log(err);
                        };
                        var dataLength = result1.length;
                        var requirePages = checkPages(dataLength);
                        totalPages = 15;
                        if (page == requirePages) {
                            totalPages = lastPageValues(dataLength)
                        }
                        fs.readFile("file1MARCH.txt", function (err, data) {

                            sql2 = data.toString() + ` order by ${orderBy} ${order} LIMIT ${totalPages} OFFSET ${offset};`;
                            con.con.query(sql2, function (err, result, fields) {
                                // if(err)  throw err;
                                res.render("pagginationWithFilter/detailList.ejs", { data1: result, data2: fields, page, requirePages, sql1, order, orderBy });
                            });
                        });
                    });
                } else {
                    //  console.log("Heljnxflo");
                   
                    StoreQuery(sql1);
                    var page = req.query.page || 1;
                    var offset = (page - 1) * 15;
                    //   var orderBy = req.query.orderBy || "exam_id";
                    con.con.query(sql1, function (err, result1) {
                        if (err) {
                            // res.status(404).send("You enterd Wrong Query!");
                            console.log(err);
                        };
                        var dataLength = result1.length;
                        var requirePages = checkPages(dataLength);
                        fs.readFile("file1MARCH.txt", function (err, data) {

                            sql2 = data.toString() + ` order by ${orderBy} ${order} LIMIT 15 OFFSET ${offset};`;
                            con.con.query(sql2, function (err, result, fields) {
                                // if(err) throw err;           
                                res.render("pagginationWithFilter/detailList.ejs", { data1: result, data2: fields, page, requirePages, sql1, order, orderBy });
                            });
                        });
                    });

                }

            }
            catch (err) {
                res.status(404).send("You enterd Wrong Query!");
            }
        }
        else {
            res.render("/home/darshan-parekh/Desktop/FirstProject/FirstProject_27MAR/views/pagginationWithFilter/index.ejs");
        }
    }
    else if (taskName == "PaginationWithSearch") {
        var secondP = req.query.secondP || 0;
        var sort = req.query.sort || 0;
        var orderBy = req.query.orderBy || 'exam_id';
        // console.log(orderBy);
        var order = req.query.order || "ASC";



        if (secondP == 1) {
          //  console.log("HelloSecondP!");
            try {

                var sql1 = req.query.query;
                var parms = req.query.parms || 2;
                if (parms == 1) {

                    var page = req.query.page || 1;
                    var offset = (page - 1) * 15;
                  
                    con.con.query(sql1, function (err, result1) {
                        if (err) {
                            // res.status(404).send("You enterd Wrong Query!");
                            res.send("You enterd wrong data" + err);
                        } else {

                            var dataLength = result1.length;

                            var requirePages = checkPages(dataLength);
                            totalPages = 15;
                            if (page == requirePages) {
                                totalPages = lastPageValues(dataLength)
                            }
                            fs.readFile("file.txt", function (err, data) {
                                sql2 = data.toString() + ` order by ${orderBy} ${order} LIMIT ${totalPages} OFFSET ${offset};`;
                                con.con.query(sql2, function (err, result, fields) {
                                    if (err) {
                                        res.send("You enterd wrong data" + err);
                                    };
                                    res.render("/home/darshan-parekh/Desktop/FirstProject/FirstProject_27MAR/views/pagginationWithSearch/detailList.ejs", { data1: result, data2: fields, page, requirePages, sql1, order, orderBy });
                                });
                            });
                        }

                    });
                } else {
                   
                    StoreQuery(sql1);
                    console.log("sql1 "+sql1);
                    var page = req.query.page || 1;
                    var offset = (page - 1) * 15;
                    //   var orderBy = req.query.orderBy || "exam_id";

                    con.con.query(sql1, function (err, result1) {
                        if (err) {
                            // res.status(404).send("You enterd Wrong Query!");
                            res.send("You enterd wrong data" + err);
                        } else {
                            var dataLength = result1.length;
                            var requirePages = checkPages(dataLength);
                            fs.readFile("file.txt", function (err, data) {
                                sql2 = data.toString() + ` order by ${orderBy} ${order} LIMIT 15 OFFSET ${offset};`;

                                con.con.query(sql2, function (err, result, fields) {
                                    // if(err) throw err;           
                                    res.render("/home/darshan-parekh/Desktop/FirstProject/FirstProject_27MAR/views/pagginationWithSearch/detailList.ejs", { data1: result, data2: fields, page, requirePages, sql1, order, orderBy });
                                });
                            });
                        }

                    });

                }

            }
            catch (err) {
                res.status(404).send("You enterd Wrong Query!");
            }
        }
        else {
            res.render("/home/darshan-parekh/Desktop/FirstProject/FirstProject_27MAR/views/pagginationWithSearch/index.ejs");
        }
    }
  
    else if(taskName=="startFilter"){

        //console.log("Hello!");
        var query = req.query.query;
        var dataa1 = req.query.data1;
        var dataa2 = req.query.data2;
        var dataa3 = req.query.data3;
        var dataa4 = req.query.data4;
        var dataa5 = req.query.data5;
        var orderBy = req.query.orderBy ||  'exam_id';
       // console.log(orderBy)
        var order = req.query.order || "ASC";
    
        
        // var sql = `${query} WHERE stu_id LIKE '%${dataa1}%' ${dataa5} subject LIKE '%${dataa2}%' ${dataa5} exam_type LIKE '%${dataa3}%' ${dataa5} practical_marks LIKE '%${dataa4}%'`;
        var sql = `${query} WHERE stu_id LIKE '${dataa1}' ${dataa5} subject LIKE '${dataa2}' ${dataa5} exam_type LIKE '${dataa3}' ${dataa5} practical_marks LIKE '${dataa4}'`;
        var sql1=`${sql};`;
       
              
            var page=req.query.page || 1;
            var offset=(page-1)*15;
            con.con.query(sql1,function(err,result1){
                if(err){
                    // res.status(404).send("You enterd Wrong Query!");
                    res.send("You enterd wrong data"+err);
                };
                var dataLength=result1.length;
                var checkResult = checkResults(dataLength);
                // if(checkResult==true){
                    
                // }
                var requirePages= checkPages(dataLength);
                totalPages=15;
                if(page==requirePages){
                    totalPages=lastPageValues(dataLength)
                }
                //fs.readFile("file.txt", function(err, data) {
                        
                    sql2=sql+` ORDER BY ${orderBy} ${order} LIMIT ${totalPages} OFFSET ${offset};`;
                    
                    //console.log("sql2 "+sql2);
                    con.con.query(sql2,function(err,result,fields1){
                        if(err){
                            // res.status(404).send("You enterd Wrong Query!");
                            res.send("You enterd wrong data"+err);
                        };
                      //  console.log(result);
                        res.render("/home/darshan-parekh/Desktop/FirstProject/FirstProject_27MAR/views/pagginationWithSearch/filterIndex.ejs",{data1:result,data2:fields1,page,requirePages,query,dataa1,dataa2,dataa3,dataa4,dataa5,checkResult,order,orderBy});                    
                    });            
                //  });            
            });
        }
        else if(taskName=="PaginationWithDeliSearch"){
            
        }
})

router.post("/taskWithSearch",(req,res)=>{
    var page=req.query.page || 1;
    order="ASC";
    
    var varId = req.body["enterData"];
   // const myArray = varId.split(",");
    
    fs.readFile("file.txt", function(err, data) {                           
        sql1=data.toString()+`;`;
        con.con.query(sql1,function(err,result,fields){    
            if(err){
                // res.status(404).send("You enterd Wrong Query!");
                res.send("You enterd wrong data"+err);
            };
          

        sql2=data.toString()+` WHERE ${fields[0].name} IN (${varId});`;
        
        orderBy=`${fields[0].name}`;
        con.con.query(sql2,function(err,result1,fields1){    

            
            var requirePages= 1;

            if(err){
                // res.status(404).send("You enterd Wrong Query!");
                res.send("You enterd wrong data"+err);
            };
            
            res.render("/home/darshan-parekh/Desktop/FirstProject/FirstProject_27MAR/views/pagginationWithSearch/detailList.ejs",{data1:result1,data2:fields1,page,requirePages,sql2,order,orderBy});         
        });   
             
    });            
  });     
})
module.exports = { router };
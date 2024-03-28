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

function stuructureSQL(sql) {
    if (sql == undefined) {
        return 0;
    }
    var arrIcon = [];
    var arrString = sql
        .replaceAll('_', '(')
        .replaceAll('^', '(')
        .replaceAll('$', '(')
        .replaceAll('}', '(')
        .replaceAll('{', '(')
        .replaceAll(':', '(')
        .split('(');


    let count = 1
    arrIcon[0] = "";
    for (let i = 0; i < sql.length; i++) {
        if (sql[i] == "_" || sql[i] == "^" || sql[i] == "$" || sql[i] == "}" || sql[i] == "{" || sql[i] == ":") {
            arrIcon[count] = sql[i];
            count++;
        }
    }

    var myArrayFirstName = [];

    const myArrayLastName = [];
    myArrayLastName.map(String);
    const myArrayGender = [];
    myArrayGender.map(String);
    const myArrayEmail = [];
    myArrayEmail.map(String);
    const myArrayCity = [];
    myArrayCity.map(String);
    const myArrayDOB = [];
    myArrayDOB.map(String);
    for (let i = 1; i < arrIcon.length; i++) {
        if (arrIcon[i] == "_") {
            myArrayFirstName.push(`'${arrString[i]}'`);
        }
        else if (arrIcon[i] == "^") {
            myArrayLastName.push(`'${arrString[i]}'`);
        }
        else if (arrIcon[i] == "$") {
            myArrayGender.push(`'${arrString[i]}'`);
        }
        else if (arrIcon[i] == "}") {
            myArrayEmail.push(`'${arrString[i]}'`);
        }
        else if (arrIcon[i] == "{") {
            myArrayCity.push(`'${arrString[i]}'`);
        }
        else if (arrIcon[i] == ":") {
            myArrayDOB.push(`'${arrString[i]}'`);
        }
    }

    let myArrayFirstNameS;
    let sql1, sql2;
    if (myArrayFirstName.length == 0) {
        myArrayFirstNameS = '%';
        sql1 = "LIKE '%'";
    }
    else {
        myArrayFirstNameS = myArrayFirstName.join(',')
        sql1 = "IN (" + myArrayFirstNameS + ")";
    }

    let myArrayLastNames;
    if (myArrayLastName.length == 0) {
        myArrayLastNames = '%';
        sql2 = "LIKE '%'";
    }
    else {
        myArrayLastNames = myArrayLastName.join(',')
        for (let i = 0; i < myArrayLastNames; i++) {

        }
        sql2 = "IN (" + myArrayLastNames + ")";
    }

    let myArrayGenders;
    let sql3;
    if (myArrayGender.length == 0) {
        myArrayGenders = '%';
        sql3 = "LIKE '%'";
    }
    else {
        myArrayGenders = myArrayGender.join(',')
        sql3 = "IN (" + myArrayGenders + ")";
    }

    let myArrayEmails;
    let sql4;
    if (myArrayEmail.length == 0) {
        myArrayEmails = '%';
        sql4 = "LIKE '%'";
    }
    else {
        myArrayEmails = myArrayEmail.join(',')
        sql4 = "IN (" + myArrayEmails + ")";
    }

    let myArrayCitys;
    let sql5;
    if (myArrayCity.length == 0) {
        myArrayCitys = '%';
        sql5 = "LIKE '%'";
    }
    else {
        myArrayCitys = myArrayCity.join(',')
        sql5 = "IN (" + myArrayCitys + ")";
    }

    let myArrayDOBs;
    let sql6;
    if (myArrayDOB.length == 0) {
        myArrayDOBs = '%';
        sql6 = "LIKE '%'";
    }
    else {
        myArrayDOBs = myArrayDOB.join(',')
        sql6 = "IN (" + myArrayDOBs + ")";
    }

    sql = `SELECT * FROM student_master WHERE first_name ${sql1} AND last_name ${sql2} AND gender ${sql3} AND email ${sql4} AND city ${sql5} AND DOB ${sql6}`;
    return sql;
}
function StoreQuery(sql) {
    fs.writeFile("file.txt", (sql),
        err => {
            if (err) throw err;
            console.log("query in Json Inserted!");
        });
}

function checkResults(dataLength) {
    if (dataLength == 0) {
        return true;
    }
    else {
        return false;
    }
}
function checkPages(dataLength) {
    var a;
    if (dataLength % 15 == 0) {
        a = dataLength / 15;
        return a;
    }
    else {
        a = (dataLength / 15) + 1;
        return Math.floor(a);
    }
}
function lastPageValues(dataLength) {
    var b;
    if (dataLength % 15 == 0) {
        b = 15;
        return b;
    }
    else {
        a = (dataLength / 15) + 1;
        b = 5;
        return b;
    }
}

router.get("/task", (req, res) => {


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
                    console.log("sql1 " + sql1);
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
                    console.log("sql1 " + sql1);
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

    else if (taskName == "startFilter") {

        //console.log("Hello!");
        var query = req.query.query;
        var dataa1 = req.query.data1;
        var dataa2 = req.query.data2;
        var dataa3 = req.query.data3;
        var dataa4 = req.query.data4;
        var dataa5 = req.query.data5;
        var orderBy = req.query.orderBy || 'exam_id';
        // console.log(orderBy)
        var order = req.query.order || "ASC";


        // var sql = `${query} WHERE stu_id LIKE '%${dataa1}%' ${dataa5} subject LIKE '%${dataa2}%' ${dataa5} exam_type LIKE '%${dataa3}%' ${dataa5} practical_marks LIKE '%${dataa4}%'`;
        var sql = `${query} WHERE stu_id LIKE '${dataa1}' ${dataa5} subject LIKE '${dataa2}' ${dataa5} exam_type LIKE '${dataa3}' ${dataa5} practical_marks LIKE '${dataa4}'`;
        var sql1 = `${sql};`;


        var page = req.query.page || 1;
        var offset = (page - 1) * 15;
        con.con.query(sql1, function (err, result1) {
            if (err) {
                // res.status(404).send("You enterd Wrong Query!");
                res.send("You enterd wrong data" + err);
            };
            var dataLength = result1.length;
            var checkResult = checkResults(dataLength);
            // if(checkResult==true){

            // }
            var requirePages = checkPages(dataLength);
            totalPages = 15;
            if (page == requirePages) {
                totalPages = lastPageValues(dataLength)
            }
            //fs.readFile("file.txt", function(err, data) {

            sql2 = sql + ` ORDER BY ${orderBy} ${order} LIMIT ${totalPages} OFFSET ${offset};`;

            //console.log("sql2 "+sql2);
            con.con.query(sql2, function (err, result, fields1) {
                if (err) {
                    // res.status(404).send("You enterd Wrong Query!");
                    res.send("You enterd wrong data" + err);
                };
                //  console.log(result);
                res.render("/home/darshan-parekh/Desktop/FirstProject/FirstProject_27MAR/views/pagginationWithSearch/filterIndex.ejs", { data1: result, data2: fields1, page, requirePages, query, dataa1, dataa2, dataa3, dataa4, dataa5, checkResult, order, orderBy });
            });
            //  });            
        });
    }
    else if (taskName == "PaginationWithDeliSearch") {
        var page = req.query.page || 1;
        var offset = (page - 1) * 15;



        sql = "select student_id,first_name,last_name,father_name,mother_name,gender,email,city,p_number,em_number from student_master";
        StoreQuery(sql);

        sql2 = sql + ";";
        con.con.query(sql2, function (err, result1, fields1) {
            if (err) {
                res.send("Sql query is not proper!  ERR: " + err);
            }
            else {
                var dataLength = result1.length;
                var requirePages = checkPages(dataLength);
                totalPages = 15;
                if (page == requirePages) {
                    totalPages = lastPageValues(dataLength)
                }

                fs.readFile("file.txt", function (err, data) {

                    sql2 = data.toString() + ` LIMIT ${totalPages} OFFSET ${offset};`;


                    con.con.query(sql2, function (err, result, fields) {
                        // if(err)  throw err;
                        res.render("/home/darshan-parekh/Desktop/FirstProject/FirstProject_27MAR/views/pagginationWithDeliSearch/index.ejs", { data1: result, data2: fields, page, requirePages });
                    });
                });
            }
        });
    }
    else if (taskName == "PaginationWithExamAndAttandanceGrid") {
        var secondTaskName = req.query.secondTaskName;
        //console.log(secondTaskName)
        if (secondTaskName == "taskHome") {
            var array1 = [];
            var array2 = [];
            var page = req.query.page || 1;
            var offset = (page - 1) * 10;
            var sql = `SELECT student_master.student_id,student_master.first_name,
    SUM(
    case 
    when exam_type="Prelims" then theory_marks
    else 0
    end
    )as prelim_theroy_marks,
    SUM(
    case 
    when exam_type="Prelims" then practical_marks
    else 0
    end
    )as prelim_practical_marks,
    SUM(
    CASE
    WHEN exam_type="Terminnal" then theory_marks
    else 0
    end
    )as Terminal_Theory_marks,
    SUM(
    CASE
    WHEN exam_type="Terminnal" then practical_marks
    else 0
    end
    )as Terminal_Practical_marks,
    SUM(
    CASE
    WHEN exam_type="Final" then theory_marks
    else 0
    end
    )as Final_Theroy_marks,
    SUM(
    CASE
    WHEN exam_type="Final" then practical_marks
    else 0
    end
    )as Final_Practical_marks,
    SUM(theory_marks+practical_marks) as Total_Marks
    FROM exam_master
    LEFT JOIN student_master 
    ON exam_master.stu_id=student_master.student_id
    GROUP BY exam_master.stu_id LIMIT 10 OFFSET ${offset};`;
            con.con.query(sql, function (err, result, field) {
                if (err) throw err;
                res.render("/home/darshan-parekh/Desktop/FirstProject/FirstProject_27MAR/views/pagginationWithExamAndAttandance/index.ejs", { data: result, page });
            });
        }
    }
    if (secondTaskName == "taskReport"){
        var Value=req.query.student;
    sql=`SELECT subject,
    SUM(
        case 
        when exam_type="Prelims" then theory_marks
        else 0
        end
        )as prelim_theroy_marks,
        SUM(
        case 
        when exam_type="Prelims" then practical_marks
        else 0
        end
        )as prelim_practical_marks,
        SUM(
        CASE
        WHEN exam_type="Terminnal" then theory_marks
        else 0
        end
        )as Terminal_Theory_marks,
        SUM(
        CASE
        WHEN exam_type="Terminnal" then practical_marks
        else 0
        end
        )as Terminal_Practical_marks,
        SUM(
        CASE
        WHEN exam_type="Final" then theory_marks
        else 0
        end
        )as Final_Theroy_marks,
        SUM(
        CASE
        WHEN exam_type="Final" then practical_marks
        else 0
        end
        )as Final_Practical_marks,
        SUM(theory_marks+practical_marks) as Total_Marks
    FROM student_27FEB_DB.exam_master WHERE stu_id=${Value} GROUP BY subject;`;
    con.con.query(sql,function(err,result,field){
        if(err) throw err;
        res.render("/home/darshan-parekh/Desktop/FirstProject/FirstProject_27MAR/views/pagginationWithExamAndAttandance/reportCard.ejs",{data:result});
    });
    }
    if(secondTaskName=="taskAtt"){
        
        var Value=req.query.student;

    var month = req.query.month || "JAN 2024";
    var totalDaysinMonth =0;
    if(month=="FEB 2024"){
        totalDaysinMonth=29;
    }
    else{
        totalDaysinMonth=31;
    }
    var sql = `SELECT a.student_id,b.first_name,b.last_name,count(a.isPresent) as present_days,ROUND(COUNT(b.student_id)/.${totalDaysinMonth},2) AS "PERCENTAGE"
    FROM attandance_master as a
    INNER JOIN student_master as b
    ON a.student_id = b.student_id WHERE att_month="${month}" AND isPresent=1 AND a.student_id=${Value} GROUP BY a.student_id`;
    con.con.query(sql,function (err,result,fields){
        if (err) throw err;
        res.render("/home/darshan-parekh/Desktop/FirstProject/FirstProject_27MAR/views/pagginationWithExamAndAttandance/student_attandance.ejs",{data:result,month});
    })
    }
    else if(taskName=="apiExercise"){
        var subTask = req.query.subTask;
        if(subTask=="callPost"){
            res.render("/home/darshan-parekh/Desktop/FirstProject/FirstProject_27MAR/views/api_call_exercise/index.ejs");
        }
        else if(subTask=="comments"){
            var id=req.query.id;
            res.render("/home/darshan-parekh/Desktop/FirstProject/FirstProject_27MAR/views/api_call_exercise/dataList.ejs",{id});
        }
    }
})

router.post("/taskWithSearch", (req, res) => {
    var page = req.query.page || 1;
    order = "ASC";

    var varId = req.body["enterData"];
    // const myArray = varId.split(",");

    fs.readFile("file.txt", function (err, data) {
        sql1 = data.toString() + `;`;
        con.con.query(sql1, function (err, result, fields) {
            if (err) {
                // res.status(404).send("You enterd Wrong Query!");
                res.send("You enterd wrong data" + err);
            };


            sql2 = data.toString() + ` WHERE ${fields[0].name} IN (${varId});`;

            orderBy = `${fields[0].name}`;
            con.con.query(sql2, function (err, result1, fields1) {


                var requirePages = 1;

                if (err) {
                    // res.status(404).send("You enterd Wrong Query!");
                    res.send("You enterd wrong data" + err);
                };

                res.render("/home/darshan-parekh/Desktop/FirstProject/FirstProject_27MAR/views/pagginationWithSearch/detailList.ejs", { data1: result1, data2: fields1, page, requirePages, sql2, order, orderBy });
            });

        });
    });
})
router.post("/DeliSearch", (req, res) => {
    var page = req.query.page || 1;
    var offset = (page - 1) * 15;

    var sql = stuructureSQL(req.body.searchResult);
    StoreQuery(sql);
    // console.log("sql"+sql);

    var sql2 = sql + ";";
    con.con.query(sql2, function (err, result1, fields1) {
        if (err) {
            res.send(err);
        }
        else {
            var dataLength = result1.length;
            var requirePages = checkPages(dataLength);
            totalPages = 15;
            if (page == requirePages) {
                totalPages = lastPageValues(dataLength)
            }

            fs.readFile("file.txt", function (err, data2) {

                sql2 = data2.toString() + ` LIMIT ${totalPages} OFFSET ${offset};`;


                con.con.query(sql2, function (err, result, fields) {
                    // if(err)  throw err;
                    res.render("/home/darshan-parekh/Desktop/FirstProject/FirstProject_27MAR/views/pagginationWithDeliSearch/index.ejs", { data1: result, data2: fields, page, requirePages });
                });
            });
        }
    });
})
router.get("/jobApplicationForm1",(req,res)=>{
    var thirdValue = false;
    var secondValid = false;
    res.render("/home/darshan-parekh/Desktop/FirstProject/FirstProject_27MAR/views/job_application_form/form.ejs", { secondValid, thirdValue });
})
router.post("/jobApplicationForm1",(req,res)=>{
    var thirdValue = false ;
    var thirdFinalValue = req.body["varification"];
    var secondValid = true;
    language=["hindi","english","gujarati"];
    var fname = req.body["fname"];
    var lname = req.body["lname"];
    var des = req.body["des"];
    var add1 = req.body["add1"];
    var email = req.body["email"];
    var add2 = req.body["add2"];
    var city = req.body["city"];
    var number = req.body["number"];
    var gender = req.body["gender_combo"];
    var state = req.body["state"];
    var rel = req.body["rel"];
    var zcode = req.body["zcode"];
    var dob = req.body["dob"];

    var empId = req.body["empId"];
   // var thirdFinalValue = ;

    let degree = req.body['degree'];
    let pyear = req.body['pyear'];
    let perc = req.body['perc'];

    var cname = req.body['cname'];
    var dess = req.body['dess'];
    var fdate = req.body['fdate'];
    var tdate = req.body['tdate'];

  //  var language = req.body['language'];
    var read = req.body['read'];
    var write = req.body['write'];
    var speak = req.body['speak'];

    var technology = req.body["technology"]
    var l_php = req.body['l_php'];
    var l_mysql = req.body["l_mysql"];
    var l_laravel = req.body["l_laravel"];
    var l_oracle = req.body["l_oracle"];

    var nref = req.body['nref'];
    var rnum = req.body['rnum'];
    var refrel = req.body['refrel'];

    var plocaton1 = req.body["plocaton1"];
    var plocaton2 = req.body["plocaton2"];
    var plocaton3 = req.body["plocaton3"];

    var nperiod = req.body["nperiod"];
    var c_ctc = req.body["c_ctc"];
    var e_ctc = req.body["e_ctc"];
    var department = req.body["department"];


    var myform = new Object();
    myform.fname = fname;
    myform.lname = lname;
    myform.des = des;
    myform.add1 = add1;
    myform.email = email;
    myform.add2 = add2;
    myform.city = city;
    myform.number = number;
    myform.gender = gender;
    myform.state = state;
    myform.email = email;
    myform.rel = rel;
    myform.zcode = zcode;
    myform.dob = dob;

    myform.degree = degree;
    myform.pyear = pyear;
    myform.perc = perc;

    myform.cname = cname;
    myform.dess = dess;
    myform.fdate = fdate;
    myform.tdate = tdate;

    myform.nref = nref;
    myform.rnum = rnum;
    myform.refrel = refrel;

    myform.plocaton1 = plocaton1;
    myform.plocaton2 = plocaton2;
    myform.plocaton3 = plocaton3;

    myform.nperiod = nperiod;
    myform.c_ctc = c_ctc;
    myform.e_ctc = e_ctc;
    myform.department = department;

    var fname_error;
    if (fname == "") {
        fname_error = "first name is empty!";
    }
    else if (fname.length < 3) {
        fname_error = "first name is too short!";
    }
    else {
        fname_error = "";
    }

    var lname_error;
    if (lname == "") {
        lname_error = "last name is empty!";
    }
    else if (lname.length < 3) {
        lname_error = "last name is too short!";
    }
    else {
        lname_error = "";
    }

    var des_error;
    if (des == "") {
        des_error = "Designaion is empty!";
    }
    else if (des.length < 3) {
        des_error = "Designation is too short!";
    }
    else {
        des_error = "";
    }

    var add1_error;
    if (add1 == "") {
        add1_error = "Address1 is empty!";
    }
    else if (add1.length < 3) {
        add1_error = "Address1 is too short!";
    }
    else {
        add1_error = "";
    }

    var add2_error;
    if (add2 == "") {
        add2_error = "Address2 is empty!";
    }
    else if (add1.length < 3) {
        add2_error = "Address2 is too short!";
    }
    else {
        add2_error = "";
    }

    var email_error;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (email == "") {
        email_error = "email is empty!";
    }
    else if (!emailRegex.test(email)) {
        email_error = "*please enter a valid email!";
    }
    else {
        email_error = "";
    }

    var city_error;
    if (city == "") {
        city_error = "Address2 is empty!";
    }
    else {
        city_error = "";
    }

    var number_error;
    const phoneRegex = /[0-9]{10}/;

    if (number == "") {
        number_error = "phone number is empty!";
    }
    else if (!phoneRegex.test(number)) {
        number_error = "*please enter a valid email!";
    }
    else {
        number_error = "";
    }

    var gender_error;
    if (gender == undefined) {
        gender_error = "*You need to select gender!";
    }
    else {
        gender_error = "";
    }

    var pincodeRegex = /^[1-9]{1}[0-9]{2}\\s{0, 1}[0-9]{3}$/;
    var zcode_error;

    zcode_error = "";
    dob_error = "";
    var nperiod_error;
    var c_ctc_error;

    if (cname[0] != "" || cname[1] != "" || cname[2] != "") {
        if (nperiod == "") {
            nperiod_error = "please mention notice period!";
        }
        else {
            nperiod_error = "";
        }

        if (c_ctc == "") {
            c_ctc_error = "please mention current CTC!";
        }
        else {
            c_ctc_error = "";
        }
    }
    else {
        nperiod_error = "";
        c_ctc_error = "";
    }

    var department_error;
    if (department == "") {
        department_error = "please mention notice period!";
    }
    else {
        department_error = "";
    }

    var location_error;
    if (plocaton1 == plocaton2 || plocaton1 == plocaton3 || plocaton2 == plocaton3) {
        location_error = "Preference location must be diffrent!";
    }
    else {
        location_error = "";
    }


    var error = new Object();
    error.fname_error = fname_error;
    error.lname_error = lname_error;
    error.des_error = des_error;
    error.add1_error = add1_error;
    error.add2_error = add2_error;

    error.email_error = email_error;
    error.city_error = city_error;
    error.number_error = number_error;
    error.gender_error = gender_error;
    error.zcode_error = zcode_error;
    error.dob_error = dob_error;

    error.nperiod_error = nperiod_error;
    error.c_ctc_error = c_ctc_error;

    error.department_error = department_error;
    error.location_error = location_error;



    var count = 0;
    for (const property in error) {
        if (error[property].length != 0) {
            count++;
        }
        // console.log(error[property]);

    }

    if (count == 0) {
        var genderID;
        var relId;
        if (gender == "male") {
            genderID = 1;
        }
        else {
            genderID = 2;
        }
        if (relId == "single") {
            relId = 1;
        }
        else {
            relId = 2;
        }
        var id;
        console.log("ThirdFinalValue is:  "+thirdFinalValue);
        if (thirdFinalValue) {
            var sql1 = `UPDATE candidate_bdetail SET first_name = '${fname}',last_name = '${lname}',designation = '${des}',address1 = '${add1}',address2 = '${add2}',email = '${email}',city = '${city}',p_number = ${number},state = '${state}',gender = '${genderID}',zip_code = '${zcode}',relationship_status ='${relId}' WHERE candidate_id = ${empId};`;

            con.con.query(sql1, function (err, result) {
                if (err) throw err;
                console.log("sql1 updated!");
                var i = 0;
                degree.map((e) => {
                    if (e != "") {
                        var sql2 = `UPDATE candidate_sEducation
                                SET course_name = '${e}',course_pyear = '${pyear[i]}',course_perc = '${perc[i]}'
                                WHERE candidate_id = ${empId};`;
                        con.con.query(sql2, function (err, result) {
                            if (err) throw err;
                            console.log("sql2 is updated!");
                        });
                    }
                    i++;
                })

                var read1 = [];
                var write1 = [];
                var speak1 = [];
                var l1 = 0, l2 = 0, l3 = 0;

                language.map((e) => {
                    var islang = false;
                    var iswrite = false;
                    var isspeak = false;


                    if (read==undefined) {
                       read1=[0,0,0];
                    }
                    else{
                        read.map((e1) => {
                            if (e == e1) {
                                read1[l1] = 1;
                                islang = true;
                            }
                        })
                        if (islang == false) {
                            read1[l1] = 0;
                        }
                        l1++;
                    }
                    
                    if (write==undefined) {
                        write1=[0,0,0];
                    }
                    else{
                        write.map((e1) => {
                            if (e == e1) {
                                write1[l2] = 1;
                                iswrite = true;
                            }
                        })
                        if (iswrite == false) {
                            write1[l2] = 0;
                        }
                        l2++;
                    }

                    if (speak==undefined) {
                        speak1=[0,0,0];
                    }
                    else{
                        speak.map((e1) => {
                            if (e == e1) {
                                speak1[l3] = 1;
                                isspeak = true;
                            }
                        })
                        if (isspeak == false) {
                            speak1[l3] = 0;
                        }
                        l3++;
                    }
                   
                })

                var sql8=`DELETE FROM known_language WHERE candidate_id=${empId}`;
                    con.con.query(sql8, function (err, result) {
                        if (err) throw err;
                        console.log("sql8 is updated!");
                    });
                 var mainLanguage;
                var l4 = 0;

                language.map((e) => {
                    if (e == "hindi") {
                        mainLanguage = 1;
                    }
                    else if (e == "english") {
                        mainLanguage = 2;
                    }
                    else {
                        mainLanguage = 3;
                    }
                    var sql3 = `INSERT INTO known_language (language_id,launguage_read,launguage_write,launguage_speak, candidate_id) VALUES ('${mainLanguage}', '${read1[l4]}', '${write1[l4]}', '${speak1[l4]}', '${empId}');`;
                    con.con.query(sql3, function (err, result) {
                        if (err) throw err;
                        // console.log("langauge inserted!");
                    });
                    l4++;
                });

                var sql9 = `DELETE FROM known_technology WHERE candidate_id='${empId}';`;
                    con.con.query(sql9, function (err, result) {
                        if (err) throw err;
                        console.log("Query deleted!");
                    });
                var technologyID;
                var technologyLevel;
                
                technology.map((e) => {
                    if (e == "php") {
                        technologyID = 1;
                        technologyLevel = l_php;
                    }
                    else if (e == "mysql") {
                        technologyID = 2;
                        technologyLevel = l_mysql;
                    }
                    else if (e == "laravel") {
                        technologyID = 3;
                        technologyLevel = l_laravel;
                    }
                    else{
                        technologyID = 4;
                        technologyLevel = l_oracle;
                    }
                    var sql4 = `INSERT INTO known_technology (technology_id,technology_level,candidate_id) VALUES ('${technologyID}', '${technologyLevel}', '${empId}');`;
                    con.con.query(sql4, function (err, result) {
                        console.log(sql4);
                        if (err) throw err;
                    });
                })

                let j = 0;
                cname.map((e) => {
                    if (e != "") {
                        var sql5 = `UPDATE work_experience SET company_name='${e}',designation='${dess[j]}',start_date='${fdate[j]}',end_date='${tdate[j]}' WHERE candidate_id='${empId}';`;
                        con.con.query(sql5, function (err, result) {
                            if (err) throw err;
                            console.log("sql5 is updated!");
                            j++;
                        });
                    }
                })

                let k = 0;
                nref.map((e) => {
                    if (e != "") {
                        var sql6 = `UPDATE candidate_references SET ref_name='${e}',ref_contact_number='${rnum[k]}',ref_relation='${refrel[k]}' WHERE candidate_id='${empId}';`;
                        con.con.query(sql6, function (err, result) {
                            if (err) throw err;
                            k++;
                        });
                    }
                })

                var nperiodVal;
                if (nperiod == "") {
                    nperiodVal = "NULL";
                }
                else {
                    nperiodVal = nperiod;
                }

                var sql7 = `UPDATE candidate_preferences SET preference_location1=${plocaton1},preference_location2=${plocaton2},preference_location3=${plocaton3}, notice_period_indays='${nperiod}',expected_ctc='${e_ctc}',current_ctc='${c_ctc}',department='${department}' WHERE candidate_id='${empId}';`;
                con.con.query(sql7, function (err, result) {
                    if (err) throw err;
                    console.log("sql7 is ipdated!");
                    res.send("Data Succefully Updated!!");
                });

            });

        }
        else {
            var sql1 = `INSERT INTO candidate_bdetail (first_name,last_name,designation,address1,address2,email,city,p_number,state,gender,zip_code,relationship_status) VALUES ('${fname}', '${lname}', '${des}', '${add1}', '${add2}', '${email}', '${city}', '${number}', '${state}', '${genderID}', '${zcode}', '${relId}');`;
            con.con.query(sql1, function (err, result) {
                if (err) throw err;
                id = result.insertId;
                console.log("1 record inserted");

                let i = 0;
                //console.log(degree);

                degree.map((e) => {

                    if (e != "") {
                        var sql2 = `INSERT INTO candidate_sEducation (course_name,course_pyear,course_perc,candidate_id) VALUES ('${e}', '${pyear[i]}', '${perc[i]}', '${id}');`;
                        con.con.query(sql2, function (err, result) {
                            if (err) throw err;
                        });
                    }
                    i++;
                });

                var read1 = [];
                var write1 = [];
                var speak1 = [];
                var l1 = 0, l2 = 0, l3 = 0;

                language.map((e) => {
                    var islang = false;
                    var iswrite = false;
                    var isspeak = false;


                    if (read==undefined) {
                       read1=[0,0,0];
                    }
                    else{
                        read.map((e1) => {
                            if (e == e1) {
                                read1[l1] = 1;
                                islang = true;
                            }
                        })
                        if (islang == false) {
                            read1[l1] = 0;
                        }
                        l1++;
                    }
                    
                    if (write==undefined) {
                        write1=[0,0,0];
                    }
                    else{
                        write.map((e1) => {
                            if (e == e1) {
                                write1[l2] = 1;
                                iswrite = true;
                            }
                        })
                        if (iswrite == false) {
                            write1[l2] = 0;
                        }
                        l2++;
                    }

                    if (speak==undefined) {
                        speak1=[0,0,0];
                    }
                    else{
                        speak.map((e1) => {
                            if (e == e1) {
                                speak1[l3] = 1;
                                isspeak = true;
                            }
                        })
                        if (isspeak == false) {
                            speak1[l3] = 0;
                        }
                        l3++;
                    }
                   
                })

                var mainLanguage;
                var l4 = 0;

                language.map((e) => {
                    if (e == "hindi") {
                        mainLanguage = 1;
                    }
                    else if (e == "english") {
                        mainLanguage = 2;
                    }
                    else {
                        mainLanguage = 3;
                    }
                    var sql3 = `INSERT INTO known_language (language_id,launguage_read,launguage_write,launguage_speak, candidate_id) VALUES ('${mainLanguage}', '${read1[l4]}', '${write1[l4]}', '${speak1[l4]}', '${id}');`;
                    con.con.query(sql3, function (err, result) {
                        if (err) throw err;
                        // console.log("langauge inserted!");
                    });
                    l4++;
                });

                var technologyID;
                var technologyLevel;
                technology.map((e) => {
                    if (e == "php") {
                        technologyID = 1;
                        technologyLevel = l_php;
                    }
                    else if (e == "mysql") {
                        technologyID = 2;
                        technologyLevel = l_mysql;
                    }
                    else if (e == "laravel") {
                        technologyID = 3;
                        technologyLevel = l_laravel;
                    }
                    else{
                        technologyID = 4;
                        technologyLevel = l_oracle;
                    }
                    var sql4 = `INSERT INTO known_technology (technology_id,technology_level,candidate_id) VALUES ('${technologyID}', '${technologyLevel}', '${id}');`;
                    con.con.query(sql4, function (err, result) {
                        if (err) throw err;
                    });
                })

                let j = 0;
                cname.map((e) => {
                    if (e != "") {
                        var sql5 = `INSERT INTO work_experience (company_name,designation,start_date,end_date,candidate_id) VALUES ('${e}','${dess[j]}','${fdate[j]}','${tdate[j]}','${id}');`;
                        con.con.query(sql5, function (err, result) {
                            if (err) throw err;
                            j++;
                        });
                    }
                })


                let k = 0;
                nref.map((e) => {
                    if (e != "") {
                        var sql6 = `INSERT INTO candidate_references (ref_name,ref_contact_number,ref_relation,candidate_id) VALUES ('${e}', '${rnum[k]}', '${refrel[k]}', '${id}');`;
                        con.con.query(sql6, function (err, result) {
                            if (err) throw err;
                            k++;
                        });
                    }
                })

                var nperiodVal;
                if (nperiod == "") {
                    nperiodVal = "NULL";
                }
                else {
                    nperiodVal = nperiod;
                }

                var sql7 = `INSERT INTO candidate_preferences (preference_location1,preference_location2,preference_location3, notice_period_indays,expected_ctc,current_ctc,department,candidate_id) VALUES (${plocaton1}, ${plocaton2}, ${plocaton3},'${nperiod}', '${e_ctc}', '${c_ctc}', '${department}', '${id}');`;
                con.con.query(sql7, function (err, result) {
                    if (err) throw err;
                    res.send("Data Succefully Inserted!!");
                });

            });

        }

    }
    else {
        console.log(count);
        res.render("/home/darshan-parekh/Desktop/FirstProject/FirstProject_27MAR/views/job_application_form/form.ejs", { data1: error, data2: myform, secondValid, thirdValue })
    }
})
router.get("/jobApplicationForm1Update",(req,res)=>{
    var thirdValue = true;
    var secondValid = false;
    var empId = req.query.empId;

    var sql = `SELECT * FROM candidate_bdetail WHERE candidate_id=${empId};`;
    con.con.query(sql, function (err, result) {
        if (err) throw err;
        if (result.length == 0) {
            res.send("Data is not relatable with this Basic ID!");
        }
        else {
            var sql1 = `SELECT * FROM candidate_sEducation WHERE candidate_id=${empId};`;
            con.con.query(sql1, function (err, result1) {
                if (err) throw err;
                else {
                    var sql2 = `SELECT * FROM work_experience WHERE candidate_id=${empId};`;
                    con.con.query(sql2, function (err, result2) {
                        if (err) throw err;
                        else {
                            var sql3 = `SELECT * FROM known_language WHERE candidate_id=${empId};`;
                            con.con.query(sql3, function (err, result3) {
                                if (err) throw err;
                                else {
                                    var sql4 = `SELECT * FROM known_technology WHERE candidate_id=${empId};`;
                                    con.con.query(sql4, function (err, result4) {
                                        if (err) throw err;
                                        else {
                                            var sql5 = `SELECT * FROM candidate_references WHERE candidate_id=${empId};`;
                                            con.con.query(sql5, function (err, result5) {
                                                if (err) throw err;
                                                else {
                                                    var sql6 = `SELECT * FROM candidate_preferences WHERE candidate_id=${empId};`;
                                                    con.con.query(sql6, function (err, result6) {
                                                        if (err) throw err;
                                                        else {
                                                            console.log(result6);
                                                            res.render("/home/darshan-parekh/Desktop/FirstProject/FirstProject_27MAR/views/job_application_form/form.ejs", { empId, thirdValue, secondValid, data: result[0], data1: result1, data2: result2, data3: result3, data4: result4, data5: result5, data6: result6[0] });
                                                        }
                                                    });

                                                }
                                            });

                                        }
                                    });

                                }
                            });

                        }
                    });

                }
            });

        }
    });
})
module.exports = { router };
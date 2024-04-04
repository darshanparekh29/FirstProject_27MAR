var con = require("../Connect.js");
var fs = require("fs");

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
const task = (req, res) => {
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
                        fs.readFile("file.txt", function (err, data) {

                            var sql2 = data.toString() + ` order by ${orderBy} ${order} LIMIT ${totalPages} OFFSET ${offset};`;
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
                        fs.readFile("file.txt", function (err, data) {

                            let sql2 = data.toString() + ` order by ${orderBy} ${order} LIMIT 15 OFFSET ${offset};`;
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

            let sql2 = sql + ` ORDER BY ${orderBy} ${order} LIMIT ${totalPages} OFFSET ${offset};`;

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
}
module.exports={task}
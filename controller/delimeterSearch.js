var fs = require("fs");
var con = require("../Connect.js");
function stuructureSQL(sql) {
    sql = sql.replace(/\s/g, '');
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
const delimeterSearch = (req, res) => {
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
}

module.exports={delimeterSearch};
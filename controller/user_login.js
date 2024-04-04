var con = require("../Connect.js");
var md5 = require('md5');
var jwt = require("jsonwebtoken");

const action1Login =(req, res) => {

    var email = req.body['email'];
    var number = req.body['number'];

    var sql2 = `SELECT * FROM user_table2 WHERE email='${email}' OR num=${number};`;
    console.log(sql2);
    con.con.query(sql2, function (err, result) {
        var isError = false;
        if (err) throw err;
        //console.log(result+"sdfAS");
        if (result.length != 0) {
            isError = true;
            res.json({ data1: isError });
        }
        else {
            //console.log("Helloi!");
            res.json({ data1: isError });
        }
    });
}
const actionLogin = (req, res) => {
    function createRandomString(length) {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let result = "";
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }
    var fname = req.body['fname'];
    var lname = req.body['lname'];
    var email = req.body['email'];
    var number = req.body['number'];
    var digit = createRandomString(12);

    var sql1 = `INSERT INTO user_table2 (fname,lname,email,num,digit,pass,salt) VALUES('${fname}', '${lname}', '${email}','${number}','${digit}',NULL,NULL);`;
    con.con.query(sql1, function (err, result) {
        if (err) throw err;
        var userID = result.insertId;
        res.json({ data1: false, data2: digit, data3: userID });
    });
}
const login = (req, res) => {
    res.render("login.ejs");
}
const checkLogin = (req, res) => {
    var email = req.body['email'];
    var pass = req.body['pass1'];
    var error = "";
    var isElegible = true;

    var sql1 = `SELECT salt FROM user_table2 WHERE email='${email}' ;`;
    con.con.query(sql1, function (err, result) {
        if (err) throw err;
        // console.log(result);

        if (result.length == 0) {
            error = "invalid Credentials!!";
            isElegible = false;
            res.json({ data1: isElegible, data2: error });
        }
        else {
            //   console.log(result[0].salt);
            var pass1 = md5(pass + result[0].salt);
            // console.log(pass1);
            var sql2 = `SELECT * FROM user_table2 WHERE email='${email}' AND pass='${pass1}';`;
            con.con.query(sql2, function (err, result) {
                if (err) throw err;
                //console.log(result.length+"length");
                if (result.length == 0) {                                                                                                                                    
                    error = "invalid Credentials!!";
                    isElegible = false;
                    res.json({ data1: isElegible, data2: error });
                }
                else {
                    const token = jwt.sign({userID:email},"darshan123",{expiresIn:"1h"})
                    res.cookie("token",token)
                    .status(200)
                
                    res.json({ data1: isElegible, data2: error ,token:token});
                }
            });
        }
    });
};
const forgetPass = (req, res) => {

    const checkLinkTime = (result) => {
        var returnVal = true;
        const date1 = new Date(result);
        const date2 = new Date();
        var diff = (date2.getTime() - date1.getTime()) / 1000;
        if (diff > 120) {
            returnVal = false;
        }
        return returnVal;
    }
    var stage = req.query.stage || 1;
    if(stage==3){
        var userId = req.query.userId;
        var digit = req.query.digit;

        var sql1 = `SELECT * FROM user_table2 WHERE id="${userId}"`;
        console.log(sql1);
        con.con.query(sql1, function (err, result){
            if(err) throw err;
            console.log(result);
            if(result[0]==undefined || result==undefined || result[0].length==0){
                res.render("tokenExpired.ejs");
            }
            else{
                if((checkLinkTime(result[0].created_at)==true) && (digit==result[0].digit)){
                    console.log("success!!!");
                    res.render("fPassword.ejs",{data1:userId,data2:digit});
                }
                else{
                    res.render("tokenExpired.ejs");
                }
            }
           
        })

    }
    else{
        res.render("fEmailPassword.ejs");
    }
}

const forgetPassPost = (req, res) => {
    var isUpdate = false;
    var Time;
    var id;
    function createRandomString(length) {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let result = "";
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    var stage = req.body.stage || 1;
    if (stage == 2) {
        var email = req.body.email;
        console.log(email);
        var sql1 = `SELECT * FROM user_table2 WHERE email="${email}"`;
        con.con.query(sql1, function (err, result) {
            if (err) throw err;
            //console.log(result[0]);
            if (result[0] == undefined) {
                res.json({ data1: false });
            }
            else {
                id = result[0].id;
                isUpdate = true;
                let date = new Date();
                var formattedDate;
                var month, min, sec, hour, msec;

                if ((date.getMonth() + 1) < 10) {
                    month = `0${(date.getMonth() + 1)}`;
                }
                else {
                    month = `${(date.getMonth() + 1)}`;
                }

                if (date.getMinutes() < 10) {
                    min = `0${date.getMinutes()}`;
                }
                else {
                    min = `${date.getMinutes()}`;
                }
                if (date.getSeconds() < 10) {
                    sec = `00${date.getSeconds()}`;
                }
                else {
                    sec = `${date.getSeconds()}`;
                }

                if (date.getHours() < 10) {
                    hour = `0${date.getHours()}`;
                }
                else {
                    hour = `${date.getHours()}`;
                }
                if (date.getMilliseconds() < 10) {
                    msec = `00${date.getMilliseconds()}`;
                }
                else if (date.getMilliseconds < 100) {
                    msec = `0${date.getMilliseconds()}`;
                }
                else {
                    msec = `${date.getMilliseconds()}`;
                }
                formattedDate = `${date.getFullYear()}-${month}-${date.getDate()}`;

                var formatTime = `${hour}:${min}:${sec}`;

                Time = `${formattedDate} ${formatTime}.${msec}`;
                console.log(Time);
                var digitt = result[0].digit;
                res.json({ data1: true, digit: digitt, userId: id });

                if (isUpdate == true) {
                    var sql2 = `UPDATE user_table2 SET created_at = '${Time}' WHERE id = ${id};;`;
                    con.con.query(sql2, function (err, result) {
                        if (err) throw err;
                        console.log("updated!!");
                    });
                }
            }           
        });
    }
}
module.exports = {action1Login,actionLogin,login,checkLogin,forgetPass,forgetPassPost};
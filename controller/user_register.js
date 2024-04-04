var con = require("../Connect.js");
const user_register=(req, res) => {

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

    var linkValidation = req.query.linkValidation || false;
    console.log(linkValidation);

    if (linkValidation) {
        var userID = req.query.userID;
        var digiLink = req.query.digiLink;

        var sql1 = `SELECT created_at,digit FROM user_table2 WHERE id=${userID};`;
        con.con.query(sql1, function (err, result) {
            if (err) throw err;
            console.log(result);
            if (result[0].length == 0) {
                //res.json({dataError:true});
                console.log("Token has been experied!!");
                res.render("tokenExpired.ejs");
            }
            else {
                if (checkLinkTime(result[0].created_at)) {
                    if (result[0].digit === digiLink) {
                        res.render("cPassword.ejs", { digitalLink: digiLink, userId: userID });
                    }
                    else {
                        console.log("Token has been experied!!");
                        res.render("tokenExpired.ejs");
                    }
                }
                else {
                    // res.json({dataError:true});
                    console.log("Token has been experied!!");
                    res.render("tokenExpired.ejs");
                }
            }
        });

    }
    else {
        res.render("register.ejs", { data1: false });
    }
}

const postPass =(req, res) => {

    function createRandomString(length) {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let result = "";
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

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

    var userID = req.body['userID'];
    var digilink = req.body['digilink'];

    var sql1 = `SELECT created_at,digit FROM user_table2 WHERE id=${userID}`;
    con.con.query(sql1, function (err, result) {
        if (err) throw err;
        if (result[0].digit == digilink && checkLinkTime(result[0].created_at)) {
            var salt = createRandomString(4);
            var pass = req.body['pass1'];
            var passSalt = pass + salt;
            var hPass = md5(passSalt);
            var sql2 = `UPDATE user_table2 SET pass = '${hPass}',salt = '${salt}' WHERE (id = ${userID});`;
            con.con.query(sql2, function (err, result) {
                if (err) throw err;
                console.log("data has been inserted!!");
                res.json({ data: "success" });
            });
        }
    });
}

module.exports={user_register,postPass};
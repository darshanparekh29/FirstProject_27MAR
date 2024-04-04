var con = require("../Connect.js");
const jobAppFormUpdate1 = (req,res)=>{
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
}

module.exports = {jobAppFormUpdate1};
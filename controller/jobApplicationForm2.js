var con = require("../Connect.js");
const jobApplicationForm2 = (req,res)=>{
    var secondValid = false;
    var sql2 = `SELECT * FROM all_states;`;
    con.con.query(sql2, function (err, result) {
        if (err) throw err;
        res.render("/home/darshan-parekh/Desktop/FirstProject/FirstProject_27MAR/views/job_application_form_ajx/form.ejs", { secondValid ,data3:result});
        //console.log("1 record inserted");     
    });
}

module.exports = {jobApplicationForm2};
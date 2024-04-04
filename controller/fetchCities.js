var con = require("../Connect.js");
const fetchCities = (req,res)=>{
    var stateId = req.query.id;
    var sql =`SELECT * FROM all_cities WHERE state_code=${stateId}`;
    con.con.query(sql, function (err, result) {
        if (err) throw err;
        res.json({data:result});
    });
}

module.exports = {fetchCities};
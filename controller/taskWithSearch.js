var con = require("../Connect.js");
const taskWithSearch = (req, res) => {
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
}

module.exports = {taskWithSearch};
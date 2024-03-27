var express = require("express");
var router = express.Router();
//var middelware = require("./formValidator");
//var con = require("./Connect");
var app = express();
//var md5 = require('md5');

router.get("/", (req, res) => {
    res.render("index.ejs");
})
router.get("/task",(req,res)=>{
    var taskName = req.query.taskName;
    if(taskName=="DynamicTable"){
        res.render("task/DynamicTable.ejs");
    }
})
module.exports = { router };
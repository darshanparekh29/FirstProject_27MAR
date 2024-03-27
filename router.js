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
    else if(taskName=="kukuCube"){
        res.render("task/cucuCube.ejs");
    }
    else if(taskName=="jsEvent"){
        res.render("task/JSEventListener.ejs");
    }
    else if(taskName=="tictac"){
        res.render("task/ticToe.ejs");
    }
    else if(taskName=="sort"){
        res.render("task/sort.ejs");
    }
})
module.exports = { router };
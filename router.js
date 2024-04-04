var express = require("express");
var router = express.Router();
var middelware = require("./formValidator");
var con = require("./Connect");
var app = express();

const checkToken = require("./tokenVerify");
const { user_register, postPass } = require("./controller/user_register");
const { action1Login, actionLogin, login, checkLogin, forgetPass, forgetPassPost } = require("./controller/user_login");
const { task } = require("./controller/tasks");
const { taskWithSearch } = require("./controller/taskWithSearch");
const { delimeterSearch } = require("./controller/delimeterSearch");
const { jobApplicationFormRender } = require("./controller/jobApplicationFormRender");
const { jobApplicationRes } = require("./controller/jobApplicationRes");
const { jobAppFormUpdate1 } = require("./controller/jobAppUpdate1");
const { jobApplicationForm2 } = require("./controller/jobApplicationForm2");
const { updateForm2 } = require("./controller/updateForm2");
const { fetchCities } = require("./controller/fetchCities");
const { controlWebPage } = require("./controller/controlWebPage");


router.get("/Home",checkToken,(req,res)=>{
    res.render("index.ejs");
})

router.get("/", user_register);
router.post("/postPassword", postPass);

router.post("/action2", action1Login);

router.post("/action", middelware.formValidator, actionLogin);
router.get("/login", login);
router.post("/checkLogin", checkLogin);

router
.get("/forgetPass", forgetPass)
.post("/forgetPass", forgetPassPost);

router.get("/task",checkToken, task)

router.post("/taskWithSearch",checkToken, taskWithSearch);

router.post("/DeliSearch",checkToken, delimeterSearch);

router
.get("/jobApplicationForm1",checkToken,jobApplicationFormRender)
.post("/jobApplicationForm1",checkToken,jobApplicationRes)

router.get("/jobApplicationForm1Update",jobAppFormUpdate1);

router.get("/jobApplicationForm2",checkToken,jobApplicationForm2);

router.post("/update",checkToken, updateForm2);

router.get("/action",checkToken,fetchCities);

router.get("/success",checkToken,(req,res)=>{
    res.send("<h1>Thank you for your presence :-) !!</h1>");
})
router.get("/webPage",checkToken,controlWebPage);

module.exports = { router };
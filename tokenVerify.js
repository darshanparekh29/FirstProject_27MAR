var jwt = require("jsonwebtoken");

const checkToken =(req,res,next)=>{
   // console.log(req.cookies.token);
    if(req.cookies.token){
        jwt.verify(req.cookies.token,"darshan123",(err)=>{
            if(err){
                //res.send("Pls login again!!");
                //res.
                res.render("login.ejs");
            }
            else{
                next();
            }
        })
    }
    else{
        res.render("login.ejs");
    }
   
}

module.exports=checkToken;
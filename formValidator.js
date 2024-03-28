const { response } = require("express");

const isStringLowerCase=(str1)=>{
    var returnVal = true;
    if(str1!==str1.toLowerCase()){
         returnVal = false;
    }
    return returnVal;
}

const formValidator=(req,res,next)=>{

    var isSecondPage = req.body['digilink'] || undefined;
    var returnVal = true;

   // console.log("isSecondPage  "+isSecondPage);

    if(isSecondPage==undefined){
        var fname = req.body['fname'];
    var lname = req.body['lname'];
    var email = req.body['email'];
    var number = req.body['number'];

    var fname_error="";
    var stringRegex = /^[a-zA-Z]+$/;
    if(fname=="" || fname==undefined){
        fname_error="please set first name!!";
        returnVal=false;
    }
    else if(stringRegex.test(fname)==false){
        fname_error="please enter valid fist name!";
    }

    var lname_error="";
    var stringRegex = /^[a-zA-Z]+$/;
    if(lname=="" || lname==undefined){
        lname_error="please set last name!!";
        returnVal=false;
    }
    else if(stringRegex.test(lname)==false){
        lname_error="please enter valid last name!";
    }


    var email_error="";
    var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
   // var emailRegex2 = /[a z]+$/;
    if (email == "" || email == undefined) {
        email_error="please set email!!";
        returnVal = false;
    }
    else if(isStringLowerCase(email) == false){
        seterror("email", "please enter email in lowercase!!");
        returnVal = false;
    }
    else if (emailRegex.test(email) == false) {
        email_error="please enter valid email!!";
        returnVal = false;
    }

    var phoneRegex = /^[0-9]{10}/;
    var number_error = "";
    if (number == "" || number==undefined) {
        number_error="please fill number!!";
        returnVal = false;
    }
    else if (phoneRegex.test(number) == false) {
        number_error="please enter valid Phone Number!!";
        returnVal = false;
    }


    var error = new Object();
    error.fname_error = fname_error;
    error.lname_error = lname_error;
    error.email_error = email_error;
    error.number_error = number_error;
    
    }
    else{
      // console.log("Hello! eror");
        var pass_error="";
       
        var pass1 = req.body['pass1'];
        var pass2 = req.body['pass2'];
       
        if(pass1!=pass2){
            pass_error="both password is not same!!";
            returnVal = false;
        }
        var error = new Object();
        error.pass_error = pass_error;

    }
   

    if(returnVal==false){
      //  console.log("hello");
        res.json({data:error});
    }
    else{
        next();
    }
   
}

module.exports={formValidator};
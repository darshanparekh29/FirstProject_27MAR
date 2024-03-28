const sendToLogin=()=>{
    window.location = `http://localhost:8081/login`;
}
var digiLink;
var userID;
const createPass = () => {
    var nextLink = getDigiLink();
    if (nextLink != undefined) {
        document.getElementById("subbtn1").style.display = "none";
        document.getElementById("form1").style.display = "none";
        document.getElementById("pass").style.display = "block";
    }
    else {
        document.getElementById("messageBox").innerHTML="Token has been experied";
        console.log("Link has been experied!");
    }
}
const registerfinal=async ()=>{
    if(formValidator2()){
        var nextLink = getDigiLink();
    if (nextLink != undefined) {
       // document.getElementById("pass").style.display = "none";
        document.getElementById("subbtn").style.display = "none";

        let form = document.getElementById("form");
        let formdata = new FormData(form);
        const params = new URLSearchParams(formdata);
        const response1 = await new Response(params).text();

        var response2 = response1+"&digilink="+getDigiLink()+"&userID="+userID;
        console.log(response2);

        await fetch(`http://localhost:8081/action`, {
            method: "post",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: response2,
        }).then(async (response) => {
            var res = await response.json();
            if(res.data==undefined){
                document.getElementById("pass").style.display = "none";
                document.getElementById("Container").style.display = "none";
                document.getElementById("Con2").style.display = "block";
                
            }
            else{
                if(res.data['pass_error']!=undefined){
                seterror("pass2", res.data['pass_error']);
                }
            }
        }).catch((e)=>{
            console.log(e);
        })
    }
    else {
        document.getElementById("messageBox").innerHTML="Token has been experied";
        console.log("Link has been experied!");
    }
    }
}
const checkCrendatial =async()=>{
    var rertunVal = true;

    let form = document.getElementById("form");
        let formdata = new FormData(form);
        const params = new URLSearchParams(formdata);
        const response1 = await new Response(params).text();
        const response2 = response1 +"&firstValid=true";

        await fetch(`http://localhost:8081/action`, {
            method: "post",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: response2,
        }).then(async (response) => {
            var res1 = await response.json()
            if (res1.data1) {
                rertunVal=false;
                seterror("number","User is alerdy exist!!");
            }  
        });
        return rertunVal;

} 
const register = async () => {
    if (formValidate() && await checkCrendatial()) {
        console.log("success..");
        let form = document.getElementById("form");
        let formdata = new FormData(form);
        const params = new URLSearchParams(formdata);
        const response1 = await new Response(params).text();

        await fetch(`http://localhost:8081/action`, {
            method: "post",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: response1,
        }).then(async (response) => {
            var res = await response.json()
            if (res.data != undefined) {
                if (res.data['fname_error'] != "" || res.data['fname_error'] != undefined) {
                    seterror("first_name", res.data['fname_error']);
                }
                if (res.data['lname_error'] != "" || res.data['lname_error'] != undefined) {
                    seterror("last_name", res.data['lname_error']);
                }
                if (res.data['email_error'] != "" || res.data['email_error'] != undefined) {
                    seterror("email", res.data['email_error']);
                }
                if (res.data['number_error'] != "" || res.data['number_error'] != undefined) {
                    seterror("number", res.data['number_error']);
                }
            }
            else {
              //  console.log(res.data1);
                if (res.data1) {
                    digiLink = res.data2;
                    document.getElementById("subbtn1").style.display = "block";
                    userID=res.data3;
                    console.log("Hello!");
                    document.getElementById("link").innerHTML=`<a>http://localhost:8081/action?digiLink=${digiLink}&userID=${userID}</a>`;
                }
            }
        });
    }
    else {
        console.log("error");
    }
    countdown();
}

let mins = 1;
let secs = mins * 60;
function countdown() {
setTimeout('Decrement()', 60);
}
function Decrement() {
if (document.getElementById) {
    minutes = document.getElementById("minutes");
    seconds = document.getElementById("seconds");
    if (seconds < 59) {
        seconds.value = secs;
    }
    else {
        minutes.value = getminutes();
        seconds.value = getseconds();
    }
    if (mins < 1) {
        minutes.style.color = "red";
        seconds.style.color = "red";
    }
    if (mins < 0) {
      //  alert('time up');
        updateDb();
        digiLink = undefined;
        minutes.value = 0;
        seconds.value = 0;
    }
    else {
        secs--;
        setTimeout('Decrement()', 1000);
    }
}
}
const updateDb=async()=>{
await fetch(`http://localhost:8081/updateDB`);
}

function getminutes() {
mins = Math.floor(secs / 60);
return mins;
}

function getseconds() {
return secs - Math.round(mins * 60);
}

const getDigiLink=()=>{
    return digiLink;
    }
    
function clearerrors() {
    element = document.getElementsByClassName("formerror");
    for (let item of element) {
        item.innerHTML = "";
    }
}
const seterror = (id, error) => {
    var a = document.getElementById(id);
    var b = a.getElementsByClassName("formerror")[0];
    b.innerHTML = error;
}
const formValidator2=()=>{
    var returnVal = true;
    clearerrors();
    var pass1 = document.getElementsByName("pass1");
    var pass2 = document.getElementsByName("pass2");
    if(pass1[0].value!=pass2[0].value){
        seterror("pass2","both password is not same!!");
        returnVal = false;
    }
    return returnVal;
}

const isStringLowerCase=(str1)=>{
    var returnVal = true;
    if(str1!==str1.toLowerCase()){
         returnVal = false;
    }
    return returnVal;
}

function formValidate() {
    var returnVal = true;
    clearerrors();
    var fname = document.getElementsByName("fname");
    var stringRegex = /^[a-zA-Z]+$/;
    if (fname[0].value == "" || fname[0].value == undefined) {
        seterror("first_name", "please set First Name!!");
        returnVal = false;
    }
    // console.log(stringRegex.test(fname)==false)
    else if (stringRegex.test(fname[0].value) == false) {
        seterror("first_name", "please enter valid First Name!!");
        returnVal = false;
    }

    var lname = document.getElementsByName("lname");
    if (lname[0].value == "" || lname[0].value == undefined) {
        seterror("last_name", "please set Last Name!!");
        returnVal = false;
    }
    else if (stringRegex.test(lname[0].value) == false) {
        seterror("last_name", "please enter valid Last Name!!");
        returnVal = false;
    }

    var email = document.getElementsByName("email");
    var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email[0].value == "" || email[0].value == undefined) {
        seterror("email", "please set email!!");
        returnVal = false;
    }
    else if(isStringLowerCase(email[0].value) == false){
        seterror("email", "please enter email in lowercase!!");
        returnVal = false;
    }
    else if (emailRegex.test(email[0].value) == false) {
        seterror("email", "please enter valid email!!");
        returnVal = false;
    }

    var phoneRegex = /^[0-9]{10}/;
    var number = document.getElementsByName("number");
    if (number[0].value == "") {
        seterror("number", "please fill number!!");
        returnVal = false;
    }
    else if (phoneRegex.test(number[0].value) == false) {
        seterror("number", "please enter valid Phone Number!!");
        returnVal = false;
    }
    return returnVal;
}
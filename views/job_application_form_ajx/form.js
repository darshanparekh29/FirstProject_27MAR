function seterror(id, error) {
    var varId = document.getElementById(id);
    varId.getElementsByClassName("formerror")[0].innerHTML = "*" + error;
}
function clearerrors() {
    element = document.getElementsByClassName("formerror");
    for (let item of element) {
        item.innerHTML = "";
    }
}
function validateForm() {
    clearerrors()
    var returnVal = true;
    let fname = document.forms["myform"]["fname"].value;

    if (fname.length < 3) {
        seterror("fname", "First name is too short!!");
        returnVal = false;
    }
    if (fname == "") {
        seterror("fname", "please enter first name!");
        returnVal = false;
    }


    let lname = document.forms["myform"]["lname"].value;
    if (lname.length < 3) {
        seterror("lname", "Last name is too short!!");
        returnVal = false;
    }
    if (lname == "") {
        seterror("lname", "please enter last name!");
        returnVal = false;
    }

    let des = document.forms["myform"]["des"].value;
    if (des.length < 3) {
        seterror("des", "Desination is too short!!");
        returnVal = false;
    }
    if (des == "") {
        seterror("des", "please enter Designation!");
        returnVal = false;
    }

    let add1 = document.forms["myform"]["add1"].value;
    if (add1.length < 3) {
        seterror("add1", "address is too short!!");
        returnVal = false;
    }
    if (add1 == "") {
        seterror("add1", "please enter address!");
        returnVal = false;
    }

    let add2 = document.forms["myform"]["add2"].value;
    if (add2.length < 3) {
        seterror("add2", "address is too short!!");
        returnVal = false;
    }
    if (add2 == "") {
        seterror("add2", "please enter address!");
        returnVal = false;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    var email = document.forms['myform']["email"].value;
    if (!emailRegex.test(email)) {
        seterror("email", "please enter a valid email!");
        returnVal = false;
    }

    let city = document.forms["myform"]["city"].value;
    if (city == "") {
        seterror("city", "please enter City!");
        returnVal = false;
    }

    let number = document.forms["myform"]["number"].value;
    let numberRegex = /[0-9]{10}/;
    if (!numberRegex.test(number)) {
        seterror("number", "Please enter a valid phone number");
        returnVal = false;
    }

    var gender = document.forms['myform']["gender_combo"].value;
    if (gender == "") {
        seterror("gender", "You need to select gender!");
        returnVal = false;
    }
    console.log(event.target.action);
    return returnVal;
}
const stateWiseCity = (state) => {
    let  url=`http://localhost:8081/action?action=fetch&id=${state}`;
    fetch(url, { method: 'GET' })
        .then(Result => Result.json())
        .then(string => {
            var html='';
            string.data.forEach(element => {
                html+=`<option value="${element.city_name}">${element.city_name}</option>`;
            });
            document.getElementById("city").innerHTML=html;
        })
        .catch(errorMsg => { console.log(errorMsg); });
}
const addReference=()=>{
    var adref = document.getElementById("references");
    adref.innerHTML+=`
    <table>
    <tr>
        <td>
            <div id="nref1"  class="refName">
                <label for="nref1">Name:</label>
                <input type="text" name="nref[]">
                <br><span class="formerror"><b>
                   
                </b></span>
            </div>
        </td>
        <td>
            <div id="rnum1" class="refNum">
                <label for="rnum1">Number:</label>
                <input type="text" name="rnum[]">
                <br><span class="formerror"><b>
                   
                </b></span>
            </div>
        </td>
        <td>
            <div id="refrel1" class="refrel">
                <label for="refrel1">Relation:</label>
                <input type="text" name="refrel[]">
                <br><span class="formerror"><b>
                    
                </b></span>
            </div>
        </td>
        <td>
            <div class="btn8" onclick="deleteRef(this)">Delete</div>
        </td>
    </tr>
</table>
    `;
}

const deleteRef=(name)=>{
    name.parentNode.parentNode.parentNode.parentNode.remove();
}


const addEducation=()=>{
    document.getElementById("addEducation").innerHTML+=`
    <table class="education">
    <tr><td><span class="formerror"><b></b></span></td></tr>
    <tr>
        <td>
            <div class="formdesign degree1">
                <label for="board">Course Name:</label>
                <input type="text" name="degree[]" 
                ><br><span class="formerror"><b>
                   
                </b></span>  
            </div>
        </td>
        <td>
            <div class="formdesign pyear1" >
                <label for="pyear">Passing Year:</label>  
                <input type="text" name="pyear[]"
                
                ><br><span class="formerror"><b>
                   
                </b></span>         
            </div>
        </td>
        <td>
            <div class="formdesign per1">
                <label for="per">Percentage:</label> 
                <input type="text" name="perc[]"
                
                ><br><span class="formerror"><b>
                   
                </b></span>
                 
            </div>
        </td>
        <td><div class="btn8" onclick="deleteEducation(this)">Delete</div></td>
    </tr>
</table>
    `;
}
const deleteEducation=(name)=>{
    name.parentNode.parentNode.parentNode.parentNode.remove();
}

const addExperence=()=>{
    var work_Experience = document.getElementById("work_Experience");
    work_Experience.innerHTML+=
    `
    <table>
    <tr>
    <td>
        <div class="formdesign cname1">
            <label for="cname1">Company name:</label>
            <input type="text" name="cname[]"
            ><br><span class="formerror"><b>  
            </b></span>
        </div>
    </td>
    <td>
        <div class="formdesign des1">
            <label for="des1">Designation:</label>
            <input type="text" name="dess[]"
            
            ><br><span class="formerror"><b>
                
            </b></span>
        </div>
    </td>
    <td>
        <div class="formdesign fdate1">
            <label for="fdate1">From:</label>
            <input type="text" name="fdate[]"
           
            ><br><span class="formerror"><b>
               
            </b></span>
        </div>
    </td>
    <td>
        <div class="formdesign tdate1">
            <label for="tdate1">To:</label>
            <input type="text" name="tdate[]"
            
            ><br><span class="formerror"><b>
                
            </b></span>
        </div>
    </td>
    <td>
        <div class="btn8" onclick="deleteExperience(this)">Delete</div>
    </td>
</tr></table>`;
}
const deleteExperience=(name)=>{
    name.parentNode.parentNode.parentNode.parentNode.remove();
}
function seterror(id, error) {
    var varId = document.getElementById(id);
    varId.getElementsByClassName("formerror")[0].innerHTML = "*" + error;
}
function validateForm() {
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


    var pincodeRegex = /^[1-9]{1}[0-9]{2}\\s{0, 1}[0-9]{3}$/;
    let pincode = document.forms['myform']["zcode"].value;
    if (!pincodeRegex.test(pincode)) {
        seterror("zcode", "Please enter valid Zip Code!!");
        returnVal = false;
    }

    var DateOfBirthregex = /(((0|1)[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/((19|20)\d\d))$/;
    let DOB = document.forms['myform']["dob"].value;
    if (!DateOfBirthregex.test(DOB)) {
        seterror("dob", "Please enter valid Date Of Birth");
        returnVal = false;
    }

    let sboard = document.forms['myform']["sboard"].value;
    let spyear = document.forms['myform']["spyear"].value;
    let sper = document.forms['myform']["sper"].value;

    if (sboard == "") {
        seterror("sboard", "Enter board name!");
        returnVal = false;
    }
    if (sper == "") {
        seterror("sper", "Enter Percentage!!");
        returnVal = false;
    }
    if (spyear == "") {
        seterror("spyear", "Enter passing Year!!");
        returnVal = false;
    }

    let hboard = document.forms['myform']["hboard"].value;
    let hpyear = document.forms['myform']["hpyear"].value;
    let hper = document.forms['myform']["hper"].value;

    if (s = hboard == "") {
        seterror("hboard", "Enter board name!");
        returnVal = false;
    }
    if (hper == "") {
        seterror("hper", "Enter Percentage!!");
        returnVal = false;
    }
    if (hpyear == "") {
        seterror("hpyear", "Enter passing Year!!");
        returnVal = false;
    }

    let bcourse = document.forms['myform']["bcourse"].value;
    let buni = document.forms['myform']["buni"].value;
    let bpyear = document.forms['myform']["bpyear"].value;
    let bper = document.forms['myform']["bper"].value;

    if (bcourse == "") {
        seterror("bcourse", "Enter Courser Name!");
        returnVal = false;
    }
    if (buni == "") {
        seterror("buni", "Enter Univercity!!");
        returnVal = false;
    }
    if (bpyear == "") {
        seterror("bpyear", "Enter Bachlor passing Year!!");
        returnVal = false;
    }
    if (bper == "") {
        seterror("bper", "Enter Bachlor Percentage!!");
        returnVal = false;
    }

    let mcourse = document.forms['myform']["mcourse"].value;
    let muni = document.forms['myform']["muni"].value;
    let mpyear = document.forms['myform']["mpyear"].value;
    let mper = document.forms['myform']["mper"].value;

    if (mcourse == "" && muni == "" && mpyear == "" && mper == "") {

    }
    else {
        if (mcourse == "") {
            seterror("mcourse", "Enter Courser Name!");
            returnVal = false;
        }
        if (muni == "") {
            seterror("muni", "Enter Univercity name!!");
            returnVal = false;
        }
        if (mpyear == "") {
            seterror("mpyear", "Enter Master passing Year!!");
            returnVal = false;
        }
        if (mper == "") {
            seterror("mper", "Enter Master Percentage!!");
            returnVal = false;
        }
    }

    let cname1 = document.forms['myform']["cname1"].value;
    let des1 = document.forms['myform']["des1"].value;
    let fdate1 = document.forms['myform']["fdate1"].value;
    let tdate1 = document.forms['myform']["tdate1"].value;

    if (cname1 == "" && des1 == "" && fdate1 == "" && tdate1 == "") {
    }
    else {
        if (cname1 == "") {
            seterror("cname1", "Enter company Name!");
            returnVal = false;
        }
        if (des1 == "") {
            seterror("des1", "Enter Designation!!");
            returnVal = false;
        }
        if (fdate1 == "") {
            seterror("fdate1", "please fill From!!");
            returnVal = false;
        }
        if (tdate1 == "") {
            seterror("tdate1", "please fill To");
            returnVal = false;
        }
    }

    let cname2 = document.forms['myform']["cname2"].value;
    let des2 = document.forms['myform']["des2"].value;
    let fdate2 = document.forms['myform']["fdate2"].value;
    let tdate2 = document.forms['myform']["tdate2"].value;

    if (cname2 == "" && des2 == "" && fdate2 == "" && tdate2 == "") {
    }
    else {
        if (cname2 == "") {
            seterror("cname2", "Enter company Name!");
            returnVal = false;
        }
        if (des2 == "") {
            seterror("des2", "Enter Designation!!");
            returnVal = false;
        }
        if (fdate2 == "") {
            seterror("fdate2", "please fill From!!");
            returnVal = false;
        }
        if (tdate2 == "") {
            seterror("tdate2", "please fill To");
            returnVal = false;
        }
    }

    let cname3 = document.forms['myform']["cname3"].value;
    let des3 = document.forms['myform']["des3"].value;
    let fdate3 = document.forms['myform']["fdate3"].value;
    let tdate3 = document.forms['myform']["tdate3"].value;

    if (cname3 == "" && des3 == "" && fdate3 == "" && tdate3 == "") {
    }
    else {
        if (cname3 == "") {
            seterror("cname3", "Enter company Name!");
            returnVal = false;
        }
        if (des3 == "") {
            seterror("des3", "Enter Designation!!");
            returnVal = false;
        }
        if (fdate3 == "") {
            seterror("fdate3", "please fill From!!");
            returnVal = false;
        }
        if (tdate3 == "") {
            seterror("tdate3", "please fill To");
            returnVal = false;
        }
    }

    var english = document.getElementById("english");
    if (english.checked == true) {
        var eread = document.getElementById("eread");
        var ewrite = document.getElementById("ewrite");
        var espeak = document.getElementById("espeak");
        if ((eread.checked == false) && (ewrite.checked == false) && (espeak.checked == false)) {
            seterror("englishLan", "select one option!");
            returnVal = false;
        }
    }

    var hindi = document.getElementById("hindi");
    if (hindi.checked == true) {
        var hread = document.getElementById("hread");
        var hwrite = document.getElementById("hwrite");
        var hspeak = document.getElementById("hspeak");
        if ((hread.checked == false) && (hwrite.checked == false) && (hspeak.checked == false)) {
            seterror("hindiLan", "select one option!");
            returnVal = false;
        }
    }

    var gujarati = document.getElementById("gujarati");
    if (gujarati.checked == true) {
        var gread = document.getElementById("gread");
        var gwrite = document.getElementById("gwrite");
        var gspeak = document.getElementById("gspeak");
        if ((gread.checked == false) && (gwrite.checked == false) && (gspeak.checked == false)) {
            seterror("gujaratiLan", "select one option!");
            returnVal = false;
        }
    }

    if(gujarati.checked == false && hindi.checked == false && english.checked == false){
        seterror("language","Please select language!!");
        returnVal = false;
    }

    var php = document.getElementById("php");
    if (php.checked == true) {
        var l_php = document.forms['myform']["l_php"].value;
        if (l_php == "") {
            seterror("pexp", "select Level!");
            returnVal = false;
        }
    }

    var mysql = document.getElementById("mysql");
    if (mysql.checked == true) {
        var l_mysql = document.forms['myform']["l_mysql"].value;
        if (l_mysql == "") {
            seterror("mexp", "select Level!");
            returnVal = false;
        }
    }

    var laravel = document.getElementById("laravel");
    if (laravel.checked == true) {
        var l_laravel = document.forms['myform']["l_laravel"].value;
        if (l_laravel == "") {
            seterror("lexp", "select Level!");
            returnVal = false;
        }
    }

    var oracle = document.getElementById("oracle");
    if (oracle.checked == true) {
        var l_oracle = document.forms['myform']["l_oracle"].value;
        if (l_oracle == "") {
            seterror("oexp", "select Level!");
            returnVal = false;
        }
    }
    if(oracle.checked == false && laravel.checked == false && mysql.checked == false && php.checked == false){
        seterror("technology","Please select Technology!!");
        returnVal = false;
    }

    let nref1 = document.forms['myform']["nref1"].value;
    let rnum1 = document.forms['myform']["rnum1"].value;
    let refrel1 = document.forms['myform']["refrel1"].value;

    if (nref1 == "" && rnum1 == "" && refrel1 == "") {
    }
    else {
        if (nref1 == "") {
            seterror("nref1", "Enter reference Name!");
            returnVal = false;
        }
        if (rnum1 == "") {
            seterror("rnum1", "Enter reference number!!");
            returnVal = false;
        }
        if (refrel1 == "") {
            seterror("refrel1", "please reference relation!!");
            returnVal = false;
        }
    }

    let nref2 = document.forms['myform']["nref2"].value;
    let rnum2 = document.forms['myform']["rnum2"].value;
    let refrel2 = document.forms['myform']["refrel2"].value;

    if (nref2 == "" && rnum2 == "" && refrel2 == "") {
    }
    else {
        if (nref2 == "") {
            seterror("nref2", "Enter reference Name!");
            returnVal = false;
        }
        if (rnum2 == "") {
            seterror("rnum2", "Enter reference number!!");
            returnVal = false;
        }
        if (refrel2 == "") {
            seterror("refrel2", "please reference relation!!");
            returnVal = false;
        }
    }

    if(cname1!="" || cname2!="" ||cname3!=""){
        let nperiod = document.forms["myform"]["nperiod"].value;
        let c_ctc = document.forms["myform"]["c_ctc"].value;
        if(nperiod==""){
            seterror("nperiod","please mention notice period!");
            returnVal = false;
        }
        if(c_ctc==""){
            seterror("c_ctc","please mention current CTC!");
            returnVal = false;
        }
    }


    let department = document.forms["myform"]["department"].value;
    if(department==""){
        seterror("department","please mention notice period!");
        returnVal = false;
    }

    var returnVal = true;
    let x1 = document.forms["myform"]["plocaton1"].value;
    let x2 = document.forms["myform"]["plocaton2"].value;
    let x3 = document.forms["myform"]["plocaton3"].value;
    if (x1 == x2 || x1 == x3 || x2 == x3) {
        seterror("plocaton", "Preference location must be diffrent!");
        returnVal = false;
    }
    return returnVal;
} 

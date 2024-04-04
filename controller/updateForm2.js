var con = require("../Connect.js");
const updateForm2 = (req, res) => {
    var secondValid = true;

    var fname = req.body["fname"];
    var lname = req.body["lname"];
    var des = req.body["des"];
    var add1 = req.body["add1"];
    var email = req.body["email"];
    var add2 = req.body["add2"];
    var city = req.body["city"];
    var number = req.body["number"];
    var gender = req.body["gender_combo"];
    var state = req.body["state"];
    var rel = req.body["rel"];
    var zcode = req.body["zcode"];
    var dob = req.body["dob"];

    let degree = req.body['degree'];
    let pyear = req.body['pyear'];
    let perc = req.body['perc'];

    var cname = req.body['cname'];
    var dess = req.body['dess'];
    var fdate = req.body['fdate'];
    var tdate = req.body['tdate'];

    var language = req.body['language'];
    var read = req.body['read'];
    var write = req.body['write'];
    var speak = req.body['speak'];
    
    var technology = req.body['technology'];
    var l_php = req.body['l_php'];
    var l_mysql = req.body["l_mysql"];
    var l_laravel = req.body["l_laravel"];
    var l_oracle = req.body["l_oracle"];

    var nref = req.body['nref'];
    var rnum = req.body['rnum'];
    var refrel = req.body['refrel'];

    var plocaton1 = req.body["plocaton1"];
    var plocaton2 = req.body["plocaton2"];
    var plocaton3 = req.body["plocaton3"];

    var nperiod = req.body["nperiod"];
    var c_ctc = req.body["c_ctc"];
    var e_ctc = req.body["e_ctc"];
    var department = req.body["department"];

    var myform = new Object();
    myform.fname = fname;
    myform.lname = lname;
    myform.des = des;
    myform.add1 = add1;
    myform.email = email;
    myform.add2 = add2;
    myform.city = city;
    myform.number = number;
    myform.gender = gender;
    myform.state = state;
    myform.email = email;
    myform.rel = rel;
    myform.zcode = zcode;
    myform.dob = dob;

    myform.degree = degree;
    myform.pyear = pyear;
    myform.perc = perc;

    myform.cname = cname;
    myform.dess = dess;
    myform.fdate = fdate;
    myform.tdate = tdate;

    myform.nref = nref;
    myform.rnum = rnum;
    myform.refrel = refrel;

    myform.plocaton1 = plocaton1;
    myform.plocaton2 = plocaton2;
    myform.plocaton3 = plocaton3;

    myform.nperiod = nperiod;
    myform.c_ctc = c_ctc;
    myform.e_ctc = e_ctc;
    myform.department = department;

        var genderID;
        var relId;
        if (gender == "male") {
            genderID = 1;
        }
        else {
            genderID = 2;
        }
        if (relId == "single") {
            relId = 1;
        }
        else {
            relId = 2;
        }
        var id;

        var sql1 = `INSERT INTO candidate_bdetail (first_name,last_name,designation,address1,address2,email,city,p_number,state,gender,zip_code,relationship_status) VALUES ('${fname}', '${lname}', '${des}', '${add1}', '${add2}', '${email}', '${city}', '${number}', '${state}', '${genderID}', '${zcode}', '${relId}');`;
        con.con.query(sql1, function (err, result) {
            if (err) throw err;
            id = result.insertId;
            console.log("1 record inserted");

            let i=0;
            degree.map((e)=>{
               
                if(e!=""){
                    var sql2 = `INSERT INTO candidate_sEducation (course_name,course_pyear,course_perc,candidate_id) VALUES ('${e}', '${pyear[i]}', '${perc[i]}', '${id}');`;
                    con.con.query(sql2, function (err, result) {
                        if (err) throw err;
                    });
                }
                i++;
            });
               
                var read1=[];
                var write1=[];
                var speak1=[];
                var l1=0,l2=0,l3=0;
                
        
                language.map((e)=>{
                    if(e!=""){
                    var islang = false;
                    var iswrite=false;
                    var isspeak = false;
                    read.map((e1)=>{
                        if(e==e1){
                            read1[l1]=1;
                            islang = true;
                        }
                    })
                    if(islang==false){
                        read1[l1]=0;
                    }
                    l1++;

                    write.map((e1)=>{
                        if(e==e1){
                            write1[l2]=1;
                            iswrite = true;
                        }
                    })
                    if(iswrite==false){
                        write1[l2]=0;
                    }
                    l2++;

                    speak.map((e1)=>{
                        if(e==e1){
                            speak1[l3]=1;
                            isspeak = true;
                        }
                    })
                    if(isspeak==false){
                        speak1[l3]=0;
                    }
                    l3++;
                    }
                    
                })
                var mainLanguage;
                var l4=0;
                language.map((e)=>{
                    if(e!=""){
                        if(e=="hindi"){
                            mainLanguage=1;
                        }
                        else if(e=="english"){
                            mainLanguage=2;
                        }
                        else{
                            mainLanguage=3;
                        }
                        var sql3 =`INSERT INTO known_language (language_id,launguage_read,launguage_write,launguage_speak, candidate_id) VALUES ('${mainLanguage}', '${read1[l4]}', '${write1[l4]}', '${speak1[l4]}', '${id}');`;
                        con.con.query(sql3, function (err, result) {
                            if (err) throw err;
                        });
                        l4++;
                    }      
                });
                var technologyID;
                var technologyLevel;
                technology.map((e)=>{
                    if(e=="php"){
                        technologyID=1;
                        technologyLevel=l_php;
                    }
                    else if(e=="mysql"){
                        technologyID=2;
                        technologyLevel=l_mysql;
                    }
                    else if(e=="laravel"){
                        technologyID=3;
                        technologyLevel=l_laravel;
                    }
                    else{
                        technologyID=4;
                        technologyLevel=l_oracle;
                    }
                    var sql4 =`INSERT INTO known_technology (technology_id,technology_level,candidate_id) VALUES ('${technologyID}', '${technologyLevel}', '${id}');`;
                        con.con.query(sql4, function (err, result) {
                            if (err) throw err;
                        });
                })

                let j=0;
                cname.map((e)=>{
                    if(e!=""){
                        var sql5 =`INSERT INTO work_experience (company_name,designation,start_date,end_date,candidate_id) VALUES ('${e}','${dess[j]}','${fdate[j]}','${tdate[j]}','${id}');`;
                        con.con.query(sql5, function (err, result) {
                            if (err) throw err;
                            j++;
                        });
                    }
                })

               
                let k=0;
                nref.map((e)=>{
                    if(e!=""){
                        var sql6 =`INSERT INTO candidate_references (ref_name,ref_contact_number,ref_relation,candidate_id) VALUES ('${e}', '${rnum[k]}', '${refrel[k]}', '${id}');`;
                        con.con.query(sql6, function (err, result) {
                            if (err) throw err;
                            k++;
                        });
                    }  
                })
               
                var nperiodVal;
                if(nperiod==""){
                    nperiodVal="NULL";
                }
                else{
                    nperiodVal=nperiod;
                }
                
                var sql7 =`INSERT INTO candidate_preferences (preference_location1,preference_location2,preference_location3, notice_period_indays,expected_ctc,current_ctc,department,candidate_id) VALUES (${plocaton1}, ${plocaton2}, ${plocaton3},'${nperiod}', '${e_ctc}', '${c_ctc}', '${department}', '${id}');`;
                con.con.query(sql7, function (err, result) {
                    if (err) throw err;
                   /// res.send("");
                });
            
        });  
}
module.exports = {updateForm2};
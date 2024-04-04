const jobApplicationFormRender = (req,res)=>{
    var thirdValue = false;
    var secondValid = false;
    res.render("/home/darshan-parekh/Desktop/FirstProject/FirstProject_27MAR/views/job_application_form/form.ejs", { secondValid, thirdValue });
}

module.exports = {jobApplicationFormRender};
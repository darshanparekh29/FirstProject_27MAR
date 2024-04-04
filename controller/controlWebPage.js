const controlWebPage = (req,res)=>{
    var webPage = req.query.page;
    if(webPage=="WebPage1"){
        res.render("/home/darshan-parekh/Desktop/FirstProject/FirstProject_27MAR/views/Ass1/index.ejs");
    }
    else if(webPage=="WebPage2"){
        res.render("/home/darshan-parekh/Desktop/FirstProject/FirstProject_27MAR/views/Ass2/index.ejs");
    }
    else if(webPage=="WebPage3"){
        res.render("/home/darshan-parekh/Desktop/FirstProject/FirstProject_27MAR/views/Ass3/index.ejs");
    }
};

module.exports = {controlWebPage};
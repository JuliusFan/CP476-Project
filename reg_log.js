window.onload = function(){

    // db stuff
    /*
    var MongoClient = require('mongodb').MongoClient;
    var url = "";

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        console.log("Database created!");
        db.close();
    });
    */
    // db stuff

    var reg_button = document.getElementById("reg_button");
    reg_button.addEventListener("click", submitRegData);

    var log_button = document.getElementById("log_button");
    log_button.addEventListener("click", submitLogData);

}

function submitRegData(event){

    var validInfo = true;

    var reg_pw = document.getElementById("reg_pw");
    if (reg_pw.value.length < 4){
        errorBackground(reg_pw, event);
        validInfo = false;
    } else 
        defaultBackground(reg_pw);

    var reg_login = document.getElementById("reg_login");
    if (reg_login.value.length < 1){
        errorBackground(reg_login, event);
        validInfo = false;
    } else 
        defaultBackground(reg_login);

    var reg_cname = document.getElementById("reg_cname");
    if (reg_cname.value.length < 1){
        errorBackground(reg_cname, event);
        validInfo = false;
    } else 
        defaultBackground(reg_cname);

    /*
    if (validInfo){
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("mydb"); // !
            var info = { log_name: "", chat_name: "", password: "" , color: "" };
            dbo.collection("customers").insertOne(info, function(err, res) { //!
              if (err) throw err;
              console.log("1 document inserted");
              db.close();
            });
        }); 
    }
    */
}

function errorBackground(element, event){
    element.style.backgroundColor = "#ff8080";
    console.log(element.value);
    event.preventDefault();
}

function defaultBackground(element){
    element.style.background = '';
}

function submitLogData(event){
    event.preventDefault();
}
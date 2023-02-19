var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');
var encoder = bodyParser.urlencoded();

const app = express();
app.use("/public",express.static("public"));

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "quiz_app"
});

con.connect(function(err) {
  if (err) throw err;
  else console.log("Connected!");
});

app.get('/',function(req, res){
    // res.status(200);
    res.sendFile(__dirname + "/index.html");
});

app.post('/',encoder,function(req,res){
    var uname = req.body.username;
    var pass =  req.body.password;

    con.query("select * from login where username = ? and password = ?",[uname,pass],function(err,result,fields){
        if (result.length > 0){
            // alert("Login Successfully");
            res.redirect("/wellcome");
        }
        else{
             res.redirect("/");
        }
        res.end();
    })
})

app.get('/wellcome',function(req, res){
    // res.status(200);
    res.sendFile(__dirname + "/wellcome.html");
});

//signup
app.post('/signup',encoder,function(req,res){
    var uname = req.body.username;
    var pass =  req.body.password;
    // var a ="aaa";
    // var b ="111";

    con.query("insert into login (username,password)values(?,?)",[uname,pass],function(err,result,fields){
        res.redirect("/");
        res.end();
    })
})
app.get('/signup',function(req, res){
    // res.status(200);
    res.sendFile(__dirname + "/signup.html");
});

app.listen(4000);

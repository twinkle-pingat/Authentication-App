const express=require("express");
const bodyParser=require("body-parser");
var ejs=require("ejs");
const encrypt=require("mongoose-encryption");


var app =express();
app.set("view engine","ejs");
app.use(express.static("public"));//tell express to access the public file
app.use(express.urlencoded({extended:true}));//for body parse


const mongoose = require ("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/secret");
const trySchema = new mongoose.Schema({
    email:String,
    password:String
});
const secret = "Thisislittlesecret";
trySchema.plugin(encrypt,{secret:secret,encryptedFields:['password']});
const item = mongoose.model("second",trySchema);
app.get("/",function(req,res){
  res.render("home")
});

app.post("/register",function(req,res){
    const newuser = new item({
        email : req.body.username,
        password : req.body.password

    });
    newuser.save(function(err){
        if(err){
            console.log(err);
        }
        else{
            res.render("secret");
        }

        
    });
});
app.get("/logout",function(req,res){
    res.render("home")
  });
app.get("/Submit a secret",function(req,res){
    res.render("home")
  });
  

app.post("/login",function(req,res){
    const username = req.body.username;
    const password = req.body.password;
    item.findOne({email:username},function(err,foundUser){
      if(err){
        console.log(err);
      }  
      else{
        if(foundUser){
          if(foundUser.password===password){
            res.render("secret");
          }  
        }
      }
    });
    });
app.get("/login",function(req,res){
    res.render("login");
});
app.get("/register",function(req,res){
    res.render("register");
});

app.listen(4000,function(){
    console.log("server started");
});
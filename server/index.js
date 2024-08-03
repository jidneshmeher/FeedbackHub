const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");


const app = express();
app.use(cors());
app.use(express.json());

const con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"211357jidu",
    database:"p3_fbapp_db"
});

// Feedback

app.post("/save",(req,res)=>{
    let data = [req.body.name,req.body.email,req.body.feedback,req.body.currentValue];
    let sql="insert into feedback values(?, ?, ?, ?)";
    con.query(sql,data,(err,result)=>{
        if (err)        res.send(err);
        else            res.send(result)
    });
});

app.get("/getdata",(req,res)=>{
    let sql = "select * from feedback";
    con.query(sql,(err,result)=>{
        if(err)   res.send(err);
        else      {
            res.send(result)
        };
    })
})

app.delete("/delete",(req,res)=>{
    let data = [req.body.name, req.body.email, req.body.feedback, req.body.rating];
    let sql = "delete from feedback where name = ? and email = ? and feedback = ? and rating = ? ";
    con.query(sql,data,(err,result)=>{
        if(err)   res.send(err);
        else      res.send(result);
    })
})

// Admin

app.get("/getadmindata",(req,res)=>{
    let sql = "select * from admin";
    con.query(sql,(err,result)=>{
        if(err)   res.send(err);
        else      {
            res.send(result)
        };
    })
})

// User

app.post("/user_save",(req,res)=>{
    let data = [req.body.username,req.body.email,req.body.phone,req.body.password,req.body.confirmpassword];
    let sql="insert into user values(?, ?, ?, ?, ?)";
    con.query(sql,data,(err,result)=>{
        if (err)        res.send(err);
        else            res.send(result)
    });
});

app.get("/user_getdata",(req,res)=>{
    let sql = "select username,password from user";
    con.query(sql,(err,result)=>{
        if(err)   res.send(err);
        else      {
            res.send(result)
        };
    })
})

app.get("/useremail_getdata",(req,res)=>{
    let sql = "select email from user";
    con.query(sql,(err,result)=>{
        if(err)   res.send(err);
        else      {
            res.send(result)
        };
    })
})

app.listen(9999,() =>{console.log("ready to serve @ 9999")});